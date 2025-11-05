// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @title CulturalAssetNFT
/// @author Bersua Team
/// @notice ERC-721 NFT representing Indonesian cultural animation assets
/// @dev Implements ERC-2981 for on-chain royalty standard
contract CulturalAssetNFT is
    ERC721,
    ERC721URIStorage,
    ERC2981,
    Ownable,
    Pausable,
    ReentrancyGuard
{
    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/

    /// @notice Counter for token IDs
    uint256 private _nextTokenId;

    /// @notice Marketplace contract authorized to mint
    address public marketplace;

    /// @notice Maximum royalty percentage (50% = 5000 basis points)
    uint96 public constant MAX_ROYALTY_BPS = 5000;

    /// @notice Basis points denominator (100% = 10000)
    uint96 public constant BPS_DENOMINATOR = 10000;

    /*//////////////////////////////////////////////////////////////
                            CUSTOM TYPES
    //////////////////////////////////////////////////////////////*/

    /// @notice Asset type categorization
    enum AssetType {
        CERITA,      // Story/Script (PDF, DOCX)
        MODEL_3D,    // 3D Models (FBX, OBJ, GLB)
        MUSIK,       // Music (MP3, WAV)
        VISUAL_2D    // 2D Visual (PNG, SVG)
    }

    /// @notice Cultural region categorization
    enum Culture {
        JAWA,
        SUNDA,
        BALI,
        SUMATERA,
        KALIMANTAN,
        SULAWESI,
        PAPUA,
        NTT,
        NTB,
        OTHER
    }

    /// @notice Metadata for each cultural asset
    struct AssetMetadata {
        string title;           // Asset title
        AssetType assetType;    // Type of asset
        Culture culture;        // Cultural origin
        address creator;        // Original creator
        uint256 price;          // Base price in wei
        uint96 royaltyBps;      // Royalty in basis points (e.g., 2000 = 20%)
        uint256 mintedAt;       // Timestamp of minting
        bool verified;          // AI verification passed
    }

    /// @notice Mapping from token ID to metadata
    mapping(uint256 => AssetMetadata) public assetMetadata;

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    /// @notice Emitted when a new cultural asset is minted
    event AssetMinted(
        uint256 indexed tokenId,
        address indexed creator,
        string title,
        AssetType assetType,
        Culture culture,
        uint256 price,
        uint96 royaltyBps
    );

    /// @notice Emitted when marketplace address is updated
    event MarketplaceUpdated(address indexed oldMarketplace, address indexed newMarketplace);

    /// @notice Emitted when royalty is updated for a token
    event RoyaltyUpdated(uint256 indexed tokenId, address receiver, uint96 royaltyBps);

    /*//////////////////////////////////////////////////////////////
                                ERRORS
    //////////////////////////////////////////////////////////////*/

    error UnauthorizedMinter();
    error InvalidRoyaltyPercentage();
    error InvalidPrice();
    error InvalidMarketplaceAddress();
    error TokenDoesNotExist();

    /*//////////////////////////////////////////////////////////////
                            CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    /// @notice Initializes the Cultural Asset NFT contract
    constructor() ERC721("Bersua Cultural Assets", "BCA") Ownable(msg.sender) {
        _nextTokenId = 1; // Start token IDs from 1
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
                            MINTING LOGIC
    //////////////////////////////////////////////////////////////*/

    /// @notice Mints a new cultural asset NFT
    /// @dev Only callable by the authorized marketplace contract
    /// @param creator Address of the asset creator
    /// @param title Title of the asset
    /// @param assetType Type of the cultural asset
    /// @param culture Cultural origin
    /// @param price Base price in wei
    /// @param royaltyBps Royalty percentage in basis points
    /// @param uri IPFS URI for metadata
    /// @return tokenId The ID of the newly minted token
    function mintAsset(
        address creator,
        string memory title,
        AssetType assetType,
        Culture culture,
        uint256 price,
        uint96 royaltyBps,
        string memory uri
    ) external whenNotPaused nonReentrant returns (uint256) {
        // Only marketplace can mint
        if (msg.sender != marketplace) revert UnauthorizedMinter();

        // Validate inputs
        if (royaltyBps > MAX_ROYALTY_BPS) revert InvalidRoyaltyPercentage();
        if (price == 0) revert InvalidPrice();

        uint256 tokenId = _nextTokenId++;

        // Mint NFT to creator
        _safeMint(creator, tokenId);
        _setTokenURI(tokenId, uri);

        // Set royalty info (ERC-2981)
        _setTokenRoyalty(tokenId, creator, royaltyBps);

        // Store metadata
        assetMetadata[tokenId] = AssetMetadata({
            title: title,
            assetType: assetType,
            culture: culture,
            creator: creator,
            price: price,
            royaltyBps: royaltyBps,
            mintedAt: block.timestamp,
            verified: true // Assumed passed AI verification
        });

        emit AssetMinted(tokenId, creator, title, assetType, culture, price, royaltyBps);

        return tokenId;
    }

    /*//////////////////////////////////////////////////////////////
                        ROYALTY MANAGEMENT
    //////////////////////////////////////////////////////////////*/

    /// @notice Updates royalty info for a specific token
    /// @dev Only token creator can update royalty
    /// @param tokenId The token ID
    /// @param receiver New royalty receiver
    /// @param royaltyBps New royalty percentage in basis points
    function updateRoyalty(
        uint256 tokenId,
        address receiver,
        uint96 royaltyBps
    ) external {
        if (_ownerOf(tokenId) == address(0)) revert TokenDoesNotExist();
        if (msg.sender != assetMetadata[tokenId].creator) revert UnauthorizedMinter();
        if (royaltyBps > MAX_ROYALTY_BPS) revert InvalidRoyaltyPercentage();

        _setTokenRoyalty(tokenId, receiver, royaltyBps);
        assetMetadata[tokenId].royaltyBps = royaltyBps;

        emit RoyaltyUpdated(tokenId, receiver, royaltyBps);
    }

    /*//////////////////////////////////////////////////////////////
                        PAUSE FUNCTIONALITY
    //////////////////////////////////////////////////////////////*/

    /// @notice Pauses all token transfers and minting
    function pause() external onlyOwner {
        _pause();
    }

    /// @notice Unpauses the contract
    function unpause() external onlyOwner {
        _unpause();
    }

    /*//////////////////////////////////////////////////////////////
                        VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Gets metadata for a specific token
    /// @param tokenId The token ID
    /// @return metadata The asset metadata
    function getAssetMetadata(uint256 tokenId)
        external
        view
        returns (AssetMetadata memory)
    {
        if (_ownerOf(tokenId) == address(0)) revert TokenDoesNotExist();
        return assetMetadata[tokenId];
    }

    /// @notice Gets the current token ID counter
    /// @return The next token ID to be minted
    function getCurrentTokenId() external view returns (uint256) {
        return _nextTokenId;
    }

    /// @notice Checks if an address is the creator of a token
    /// @param tokenId The token ID
    /// @param account The address to check
    /// @return True if the account is the creator
    function isCreator(uint256 tokenId, address account) external view returns (bool) {
        return assetMetadata[tokenId].creator == account;
    }

    /*//////////////////////////////////////////////////////////////
                        REQUIRED OVERRIDES
    //////////////////////////////////////////////////////////////*/

    /// @notice Returns the token URI
    /// @dev Overrides required by Solidity for multiple inheritance
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /// @notice Checks interface support
    /// @dev Overrides required for ERC-165 support
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /// @notice Hook called before any token transfer
    /// @dev Prevents transfers when paused
    function _update(address to, uint256 tokenId, address auth)
        internal
        override
        whenNotPaused
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }
}
