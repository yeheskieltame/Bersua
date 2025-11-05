// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "./CulturalAssetNFT.sol";
import "./LicenseManager.sol";

/// @title Marketplace
/// @author Bersua Team
/// @notice Main marketplace for minting, listing, and purchasing cultural assets with gasless support
/// @dev Implements EIP-2771 for meta-transactions (gasless)
contract Marketplace is
    Ownable,
    Pausable,
    ReentrancyGuard,
    ERC2771Context
{
    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/

    /// @notice Cultural Asset NFT contract
    CulturalAssetNFT public immutable nftContract;

    /// @notice License Manager contract
    LicenseManager public immutable licenseManager;

    /// @notice Platform fee in basis points (e.g., 250 = 2.5%)
    uint96 public platformFeeBps;

    /// @notice Platform fee recipient
    address public feeRecipient;

    /// @notice Royalty distributor contract
    address public royaltyDistributor;

    /// @notice Minimum price for assets (in wei)
    uint256 public constant MIN_PRICE = 0.001 ether;

    /*//////////////////////////////////////////////////////////////
                            CUSTOM TYPES
    //////////////////////////////////////////////////////////////*/

    /// @notice Listing data structure
    struct Listing {
        uint256 tokenId;
        address seller;
        uint256 basePrice;
        bool active;
        uint256 listedAt;
    }

    /// @notice Mapping from token ID to listing
    mapping(uint256 => Listing) public listings;

    /// @notice Array of all active token IDs
    uint256[] private activeTokenIds;

    /// @notice Mapping to track token position in array
    mapping(uint256 => uint256) private tokenIdIndex;

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    /// @notice Emitted when an asset is minted and listed
    event AssetMintedAndListed(
        uint256 indexed tokenId,
        address indexed creator,
        uint256 price
    );

    /// @notice Emitted when an asset is purchased with license
    event AssetPurchased(
        uint256 indexed tokenId,
        address indexed buyer,
        LicenseManager.LicenseTier tier,
        uint256 price,
        uint256 licenseId
    );

    /// @notice Emitted when a listing is cancelled
    event ListingCancelled(uint256 indexed tokenId, address indexed seller);

    /// @notice Emitted when listing price is updated
    event PriceUpdated(uint256 indexed tokenId, uint256 oldPrice, uint256 newPrice);

    /// @notice Emitted when platform fee is updated
    event PlatformFeeUpdated(uint96 oldFee, uint96 newFee);

    /// @notice Emitted when royalty is paid
    event RoyaltyPaid(
        uint256 indexed tokenId,
        address indexed creator,
        uint256 amount
    );

    /*//////////////////////////////////////////////////////////////
                                ERRORS
    //////////////////////////////////////////////////////////////*/

    error InvalidPrice();
    error InvalidAddress();
    error NotAssetOwner();
    error ListingNotActive();
    error InsufficientPayment();
    error TransferFailed();
    error InvalidFeePercentage();

    /*//////////////////////////////////////////////////////////////
                            CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    /// @notice Initializes the marketplace
    /// @param _nftContract Address of CulturalAssetNFT contract
    /// @param _licenseManager Address of LicenseManager contract
    /// @param _trustedForwarder Address of EIP-2771 forwarder (for gasless txs)
    /// @param _feeRecipient Address to receive platform fees
    constructor(
        address _nftContract,
        address _licenseManager,
        address _trustedForwarder,
        address _feeRecipient
    )
        Ownable(msg.sender)
        ERC2771Context(_trustedForwarder)
    {
        if (_nftContract == address(0) || _licenseManager == address(0)) {
            revert InvalidAddress();
        }

        nftContract = CulturalAssetNFT(_nftContract);
        licenseManager = LicenseManager(_licenseManager);
        feeRecipient = _feeRecipient;
        platformFeeBps = 250; // 2.5% default
    }

    /*//////////////////////////////////////////////////////////////
                        MINTING & LISTING
    //////////////////////////////////////////////////////////////*/

    /// @notice Mints a new cultural asset and lists it on marketplace
    /// @dev Gasless transaction compatible (EIP-2771)
    /// @param title Asset title
    /// @param assetType Type of asset
    /// @param culture Cultural origin
    /// @param price Base price in wei
    /// @param royaltyBps Royalty percentage in basis points
    /// @param uri IPFS metadata URI
    /// @return tokenId The minted token ID
    function mintAndList(
        string memory title,
        CulturalAssetNFT.AssetType assetType,
        CulturalAssetNFT.Culture culture,
        uint256 price,
        uint96 royaltyBps,
        string memory uri
    ) external whenNotPaused nonReentrant returns (uint256) {
        if (price < MIN_PRICE) revert InvalidPrice();

        address creator = _msgSender(); // EIP-2771 compatible

        // Mint NFT through NFT contract
        uint256 tokenId = nftContract.mintAsset(
            creator,
            title,
            assetType,
            culture,
            price,
            royaltyBps,
            uri
        );

        // Create listing
        listings[tokenId] = Listing({
            tokenId: tokenId,
            seller: creator,
            basePrice: price,
            active: true,
            listedAt: block.timestamp
        });

        // Track active listing
        tokenIdIndex[tokenId] = activeTokenIds.length;
        activeTokenIds.push(tokenId);

        emit AssetMintedAndListed(tokenId, creator, price);

        return tokenId;
    }

    /*//////////////////////////////////////////////////////////////
                        PURCHASE LOGIC
    //////////////////////////////////////////////////////////////*/

    /// @notice Purchase a license for an asset
    /// @dev Gasless transaction compatible (EIP-2771)
    /// @param tokenId Asset token ID
    /// @param tier License tier to purchase
    function purchaseLicense(uint256 tokenId, LicenseManager.LicenseTier tier)
        external
        payable
        whenNotPaused
        nonReentrant
    {
        Listing memory listing = listings[tokenId];
        if (!listing.active) revert ListingNotActive();

        address buyer = _msgSender(); // EIP-2771 compatible

        // Calculate tier price
        uint256 tierPrice = licenseManager.calculateTierPrice(listing.basePrice, tier);
        if (msg.value < tierPrice) revert InsufficientPayment();

        // Calculate fees and royalty
        uint256 platformFee = (tierPrice * platformFeeBps) / 10000;
        uint96 tierRoyalty = licenseManager.getTierRoyalty(tier);
        uint256 royaltyAmount = (tierPrice * tierRoyalty) / 10000;
        uint256 creatorAmount = tierPrice - platformFee - royaltyAmount;

        // Get creator address
        CulturalAssetNFT.AssetMetadata memory metadata = nftContract.getAssetMetadata(tokenId);
        address creator = metadata.creator;

        // Issue license
        uint256 licenseId = licenseManager.issueLicense(
            tokenId,
            buyer,
            tier,
            listing.basePrice,
            tierPrice
        );

        // Transfer funds
        _transferFunds(creator, creatorAmount);
        _transferFunds(feeRecipient, platformFee);

        // Handle royalty
        if (royaltyDistributor != address(0)) {
            _transferFunds(royaltyDistributor, royaltyAmount);
        } else {
            _transferFunds(creator, royaltyAmount);
        }

        // Refund excess payment
        if (msg.value > tierPrice) {
            _transferFunds(buyer, msg.value - tierPrice);
        }

        emit AssetPurchased(tokenId, buyer, tier, tierPrice, licenseId);
        emit RoyaltyPaid(tokenId, creator, royaltyAmount);
    }

    /*//////////////////////////////////////////////////////////////
                        LISTING MANAGEMENT
    //////////////////////////////////////////////////////////////*/

    /// @notice Cancel a listing
    /// @param tokenId Token ID to delist
    function cancelListing(uint256 tokenId) external nonReentrant {
        Listing storage listing = listings[tokenId];
        if (listing.seller != _msgSender()) revert NotAssetOwner();
        if (!listing.active) revert ListingNotActive();

        listing.active = false;
        _removeFromActiveListings(tokenId);

        emit ListingCancelled(tokenId, _msgSender());
    }

    /// @notice Update listing price
    /// @param tokenId Token ID
    /// @param newPrice New base price
    function updatePrice(uint256 tokenId, uint256 newPrice) external {
        Listing storage listing = listings[tokenId];
        if (listing.seller != _msgSender()) revert NotAssetOwner();
        if (!listing.active) revert ListingNotActive();
        if (newPrice < MIN_PRICE) revert InvalidPrice();

        uint256 oldPrice = listing.basePrice;
        listing.basePrice = newPrice;

        emit PriceUpdated(tokenId, oldPrice, newPrice);
    }

    /*//////////////////////////////////////////////////////////////
                        ADMIN FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Set platform fee
    /// @param newFeeBps New fee in basis points
    function setPlatformFee(uint96 newFeeBps) external onlyOwner {
        if (newFeeBps > 1000) revert InvalidFeePercentage(); // Max 10%

        uint96 oldFee = platformFeeBps;
        platformFeeBps = newFeeBps;

        emit PlatformFeeUpdated(oldFee, newFeeBps);
    }

    /// @notice Set fee recipient
    /// @param newRecipient New fee recipient address
    function setFeeRecipient(address newRecipient) external onlyOwner {
        if (newRecipient == address(0)) revert InvalidAddress();
        feeRecipient = newRecipient;
    }

    /// @notice Set royalty distributor contract
    /// @param _royaltyDistributor Royalty distributor address
    function setRoyaltyDistributor(address _royaltyDistributor) external onlyOwner {
        royaltyDistributor = _royaltyDistributor;
    }

    /// @notice Pause marketplace
    function pause() external onlyOwner {
        _pause();
    }

    /// @notice Unpause marketplace
    function unpause() external onlyOwner {
        _unpause();
    }

    /*//////////////////////////////////////////////////////////////
                        VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Get all active listings
    /// @return tokenIds Array of active token IDs
    function getActiveListings() external view returns (uint256[] memory) {
        return activeTokenIds;
    }

    /// @notice Get listing details
    /// @param tokenId Token ID
    /// @return listing The listing data
    function getListing(uint256 tokenId) external view returns (Listing memory) {
        return listings[tokenId];
    }

    /// @notice Get total active listings count
    /// @return count Number of active listings
    function getActiveListingsCount() external view returns (uint256) {
        return activeTokenIds.length;
    }

    /// @notice Calculate purchase price for a tier
    /// @param tokenId Token ID
    /// @param tier License tier
    /// @return price Total price including fees
    function calculatePurchasePrice(uint256 tokenId, LicenseManager.LicenseTier tier)
        external
        view
        returns (uint256)
    {
        Listing memory listing = listings[tokenId];
        return licenseManager.calculateTierPrice(listing.basePrice, tier);
    }

    /*//////////////////////////////////////////////////////////////
                        INTERNAL HELPERS
    //////////////////////////////////////////////////////////////*/

    /// @notice Safe fund transfer with error handling
    /// @param to Recipient address
    /// @param amount Amount to transfer
    function _transferFunds(address to, uint256 amount) private {
        if (amount == 0) return;
        (bool success, ) = payable(to).call{value: amount}("");
        if (!success) revert TransferFailed();
    }

    /// @notice Remove token from active listings array
    /// @param tokenId Token ID to remove
    function _removeFromActiveListings(uint256 tokenId) private {
        uint256 index = tokenIdIndex[tokenId];
        uint256 lastIndex = activeTokenIds.length - 1;

        if (index != lastIndex) {
            uint256 lastTokenId = activeTokenIds[lastIndex];
            activeTokenIds[index] = lastTokenId;
            tokenIdIndex[lastTokenId] = index;
        }

        activeTokenIds.pop();
        delete tokenIdIndex[tokenId];
    }

    /*//////////////////////////////////////////////////////////////
                        EIP-2771 OVERRIDES
    //////////////////////////////////////////////////////////////*/

    /// @notice Get the sender of the transaction (supports meta-transactions)
    /// @dev Override required for EIP-2771
    function _msgSender()
        internal
        view
        override(Context, ERC2771Context)
        returns (address)
    {
        return ERC2771Context._msgSender();
    }

    /// @notice Get transaction data (supports meta-transactions)
    /// @dev Override required for EIP-2771
    function _msgData()
        internal
        view
        override(Context, ERC2771Context)
        returns (bytes calldata)
    {
        return ERC2771Context._msgData();
    }

    /// @notice Check interface support
    function _contextSuffixLength()
        internal
        view
        override(Context, ERC2771Context)
        returns (uint256)
    {
        return ERC2771Context._contextSuffixLength();
    }
}
