// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title LicenseManager
/// @author Bersua Team
/// @notice Manages 3-tier licensing system for cultural assets
/// @dev Tracks license purchases and validates usage rights
contract LicenseManager is Ownable, Pausable, ReentrancyGuard {
    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/

    /// @notice Marketplace contract authorized to issue licenses
    address public marketplace;

    /*//////////////////////////////////////////////////////////////
                            CUSTOM TYPES
    //////////////////////////////////////////////////////////////*/

    /// @notice License tier types
    enum LicenseTier {
        PERSONAL,    // 50% price - Non-commercial use only
        COMMERCIAL,  // 100% price - Full commercial rights, unlimited projects
        UNLIMITED    // 250% price - Includes resale rights + modification rights
    }

    /// @notice License data structure
    struct License {
        uint256 tokenId;           // Asset token ID
        address licensee;          // License holder
        LicenseTier tier;          // License tier
        uint256 purchasePrice;     // Amount paid
        uint256 purchasedAt;       // Timestamp
        bool active;               // License status
    }

    /// @notice License pricing multipliers in basis points
    /// @dev PERSONAL = 5000 (50%), COMMERCIAL = 10000 (100%), UNLIMITED = 25000 (250%)
    mapping(LicenseTier => uint256) public tierMultipliers;

    /// @notice Royalty percentages per tier in basis points
    mapping(LicenseTier => uint96) public tierRoyalties;

    /// @notice Counter for license IDs
    uint256 private _nextLicenseId;

    /// @notice Mapping from license ID to license data
    mapping(uint256 => License) public licenses;

    /// @notice Mapping from (tokenId => licensee => tier) to license ID
    mapping(uint256 => mapping(address => mapping(LicenseTier => uint256))) public userLicenses;

    /// @notice Mapping from token ID to all license IDs issued
    mapping(uint256 => uint256[]) public tokenLicenses;

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    /// @notice Emitted when a license is issued
    event LicenseIssued(
        uint256 indexed licenseId,
        uint256 indexed tokenId,
        address indexed licensee,
        LicenseTier tier,
        uint256 price
    );

    /// @notice Emitted when a license is revoked
    event LicenseRevoked(uint256 indexed licenseId, uint256 indexed tokenId, address indexed licensee);

    /// @notice Emitted when marketplace address is updated
    event MarketplaceUpdated(address indexed oldMarketplace, address indexed newMarketplace);

    /// @notice Emitted when tier multipliers are updated
    event TierMultipliersUpdated(LicenseTier tier, uint256 multiplier);

    /*//////////////////////////////////////////////////////////////
                                ERRORS
    //////////////////////////////////////////////////////////////*/

    error UnauthorizedIssuer();
    error InvalidMarketplaceAddress();
    error InvalidPrice();
    error LicenseNotFound();
    error LicenseAlreadyExists();

    /*//////////////////////////////////////////////////////////////
                            CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    /// @notice Initializes the License Manager
    constructor() Ownable(msg.sender) {
        _nextLicenseId = 1;

        // Set default tier multipliers (basis points, 10000 = 100%)
        tierMultipliers[LicenseTier.PERSONAL] = 5000;    // 50%
        tierMultipliers[LicenseTier.COMMERCIAL] = 10000;  // 100%
        tierMultipliers[LicenseTier.UNLIMITED] = 25000;   // 250%

        // Set default royalty percentages per tier
        tierRoyalties[LicenseTier.PERSONAL] = 1500;      // 15%
        tierRoyalties[LicenseTier.COMMERCIAL] = 2000;    // 20%
        tierRoyalties[LicenseTier.UNLIMITED] = 2500;     // 25%
    }

    /*//////////////////////////////////////////////////////////////
                        MARKETPLACE MANAGEMENT
    //////////////////////////////////////////////////////////////*/

    /// @notice Sets the authorized marketplace contract
    /// @param _marketplace Address of the marketplace contract
    function setMarketplace(address _marketplace) external onlyOwner {
        if (_marketplace == address(0)) revert InvalidMarketplaceAddress();

        address oldMarketplace = marketplace;
        marketplace = _marketplace;

        emit MarketplaceUpdated(oldMarketplace, _marketplace);
    }

    /*//////////////////////////////////////////////////////////////
                        LICENSE ISSUANCE
    //////////////////////////////////////////////////////////////*/

    /// @notice Issues a new license for an asset
    /// @dev Only callable by marketplace contract
    /// @param tokenId The asset token ID
    /// @param licensee Address receiving the license
    /// @param tier License tier being purchased
    /// @param basePrice Base price of the asset
    /// @param amountPaid Actual amount paid
    /// @return licenseId The ID of the newly issued license
    function issueLicense(
        uint256 tokenId,
        address licensee,
        LicenseTier tier,
        uint256 basePrice,
        uint256 amountPaid
    ) external whenNotPaused nonReentrant returns (uint256) {
        if (msg.sender != marketplace) revert UnauthorizedIssuer();
        if (amountPaid == 0) revert InvalidPrice();

        // Check if user already has this license tier
        uint256 existingLicenseId = userLicenses[tokenId][licensee][tier];
        if (existingLicenseId != 0 && licenses[existingLicenseId].active) {
            revert LicenseAlreadyExists();
        }

        uint256 licenseId = _nextLicenseId++;

        // Create license
        licenses[licenseId] = License({
            tokenId: tokenId,
            licensee: licensee,
            tier: tier,
            purchasePrice: amountPaid,
            purchasedAt: block.timestamp,
            active: true
        });

        // Track license mappings
        userLicenses[tokenId][licensee][tier] = licenseId;
        tokenLicenses[tokenId].push(licenseId);

        emit LicenseIssued(licenseId, tokenId, licensee, tier, amountPaid);

        return licenseId;
    }

    /// @notice Revokes a license
    /// @dev Can only be called by marketplace or owner
    /// @param licenseId The license ID to revoke
    function revokeLicense(uint256 licenseId) external {
        if (msg.sender != marketplace && msg.sender != owner()) {
            revert UnauthorizedIssuer();
        }

        License storage license = licenses[licenseId];
        if (!license.active) revert LicenseNotFound();

        license.active = false;

        emit LicenseRevoked(licenseId, license.tokenId, license.licensee);
    }

    /*//////////////////////////////////////////////////////////////
                        PRICE CALCULATIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Calculates the price for a specific license tier
    /// @param basePrice Base price of the asset
    /// @param tier License tier
    /// @return price The calculated price for the tier
    function calculateTierPrice(uint256 basePrice, LicenseTier tier)
        public
        view
        returns (uint256)
    {
        return (basePrice * tierMultipliers[tier]) / 10000;
    }

    /// @notice Gets the royalty percentage for a tier
    /// @param tier License tier
    /// @return royaltyBps Royalty in basis points
    function getTierRoyalty(LicenseTier tier) external view returns (uint96) {
        return tierRoyalties[tier];
    }

    /*//////////////////////////////////////////////////////////////
                        ADMIN FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Updates tier multiplier
    /// @param tier License tier
    /// @param multiplier New multiplier in basis points
    function updateTierMultiplier(LicenseTier tier, uint256 multiplier) external onlyOwner {
        tierMultipliers[tier] = multiplier;
        emit TierMultipliersUpdated(tier, multiplier);
    }

    /// @notice Updates tier royalty percentage
    /// @param tier License tier
    /// @param royaltyBps New royalty in basis points
    function updateTierRoyalty(LicenseTier tier, uint96 royaltyBps) external onlyOwner {
        require(royaltyBps <= 5000, "Royalty too high"); // Max 50%
        tierRoyalties[tier] = royaltyBps;
    }

    /*//////////////////////////////////////////////////////////////
                        VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Checks if a user has a valid license for an asset
    /// @param tokenId Asset token ID
    /// @param licensee Address to check
    /// @param tier License tier
    /// @return valid True if license is valid
    function hasValidLicense(
        uint256 tokenId,
        address licensee,
        LicenseTier tier
    ) external view returns (bool) {
        uint256 licenseId = userLicenses[tokenId][licensee][tier];
        if (licenseId == 0) return false;
        return licenses[licenseId].active;
    }

    /// @notice Gets license details
    /// @param licenseId License ID
    /// @return license The license data
    function getLicense(uint256 licenseId) external view returns (License memory) {
        return licenses[licenseId];
    }

    /// @notice Gets all licenses for a token
    /// @param tokenId Asset token ID
    /// @return licenseIds Array of license IDs
    function getTokenLicenses(uint256 tokenId) external view returns (uint256[] memory) {
        return tokenLicenses[tokenId];
    }

    /// @notice Gets the user's license ID for a token and tier
    /// @param tokenId Asset token ID
    /// @param licensee User address
    /// @param tier License tier
    /// @return licenseId The license ID (0 if none)
    function getUserLicense(
        uint256 tokenId,
        address licensee,
        LicenseTier tier
    ) external view returns (uint256) {
        return userLicenses[tokenId][licensee][tier];
    }

    /// @notice Checks if user can use asset commercially
    /// @param tokenId Asset token ID
    /// @param user User address
    /// @return canUse True if user has commercial or unlimited license
    function canUseCommercially(uint256 tokenId, address user) external view returns (bool) {
        uint256 commercialLicenseId = userLicenses[tokenId][user][LicenseTier.COMMERCIAL];
        uint256 unlimitedLicenseId = userLicenses[tokenId][user][LicenseTier.UNLIMITED];

        bool hasCommercial = commercialLicenseId != 0 && licenses[commercialLicenseId].active;
        bool hasUnlimited = unlimitedLicenseId != 0 && licenses[unlimitedLicenseId].active;

        return hasCommercial || hasUnlimited;
    }

    /// @notice Checks if user can resell/modify asset
    /// @param tokenId Asset token ID
    /// @param user User address
    /// @return canResell True if user has unlimited license
    function canResell(uint256 tokenId, address user) external view returns (bool) {
        uint256 unlimitedLicenseId = userLicenses[tokenId][user][LicenseTier.UNLIMITED];
        return unlimitedLicenseId != 0 && licenses[unlimitedLicenseId].active;
    }

    /*//////////////////////////////////////////////////////////////
                        PAUSE FUNCTIONALITY
    //////////////////////////////////////////////////////////////*/

    /// @notice Pauses license issuance
    function pause() external onlyOwner {
        _pause();
    }

    /// @notice Unpauses license issuance
    function unpause() external onlyOwner {
        _unpause();
    }
}
