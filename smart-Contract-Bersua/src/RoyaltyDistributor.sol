// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "./CulturalAssetNFT.sol";

/// @title RoyaltyDistributor
/// @author Bersua Team
/// @notice Automated royalty distribution system for cultural asset creators
/// @dev Receives royalties from marketplace sales and auto-distributes to creators
contract RoyaltyDistributor is Ownable, ReentrancyGuard, Pausable {
    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/

    /// @notice Cultural Asset NFT contract
    CulturalAssetNFT public immutable nftContract;

    /// @notice Marketplace contract authorized to deposit royalties
    address public marketplace;

    /// @notice Minimum withdrawal amount to prevent spam (0.001 ETH)
    uint256 public constant MIN_WITHDRAWAL = 0.001 ether;

    /*//////////////////////////////////////////////////////////////
                            CUSTOM TYPES
    //////////////////////////////////////////////////////////////*/

    /// @notice Royalty balance tracking
    mapping(address => uint256) public pendingRoyalties;

    /// @notice Total royalties received per creator
    mapping(address => uint256) public totalRoyaltiesReceived;

    /// @notice Total royalties withdrawn per creator
    mapping(address => uint256) public totalRoyaltiesWithdrawn;

    /// @notice Royalty distribution records
    struct RoyaltyRecord {
        uint256 tokenId;
        address creator;
        uint256 amount;
        uint256 timestamp;
    }

    /// @notice Array of all royalty distributions
    RoyaltyRecord[] public royaltyHistory;

    /// @notice Mapping from creator to their royalty record indices
    mapping(address => uint256[]) public creatorRoyaltyIndices;

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    /// @notice Emitted when royalty is deposited
    event RoyaltyDeposited(
        uint256 indexed tokenId,
        address indexed creator,
        uint256 amount
    );

    /// @notice Emitted when royalty is withdrawn
    event RoyaltyWithdrawn(
        address indexed creator,
        uint256 amount
    );

    /// @notice Emitted when marketplace address is updated
    event MarketplaceUpdated(
        address indexed oldMarketplace,
        address indexed newMarketplace
    );

    /*//////////////////////////////////////////////////////////////
                                ERRORS
    //////////////////////////////////////////////////////////////*/

    error UnauthorizedDepositor();
    error InvalidMarketplaceAddress();
    error InsufficientBalance();
    error BelowMinimumWithdrawal();
    error TransferFailed();
    error InvalidAmount();

    /*//////////////////////////////////////////////////////////////
                            CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    /// @notice Initializes the Royalty Distributor
    /// @param _nftContract Address of CulturalAssetNFT contract
    constructor(address _nftContract) Ownable(msg.sender) {
        if (_nftContract == address(0)) revert InvalidMarketplaceAddress();
        nftContract = CulturalAssetNFT(_nftContract);
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
                        ROYALTY DEPOSIT
    //////////////////////////////////////////////////////////////*/

    /// @notice Deposits royalty for a specific token
    /// @dev Only callable by authorized marketplace
    /// @param tokenId Asset token ID
    function depositRoyalty(uint256 tokenId)
        external
        payable
        whenNotPaused
        nonReentrant
    {
        if (msg.sender != marketplace) revert UnauthorizedDepositor();
        if (msg.value == 0) revert InvalidAmount();

        // Get creator from NFT contract
        CulturalAssetNFT.AssetMetadata memory metadata = nftContract.getAssetMetadata(tokenId);
        address creator = metadata.creator;

        // Update balances
        pendingRoyalties[creator] += msg.value;
        totalRoyaltiesReceived[creator] += msg.value;

        // Record distribution
        uint256 recordIndex = royaltyHistory.length;
        royaltyHistory.push(RoyaltyRecord({
            tokenId: tokenId,
            creator: creator,
            amount: msg.value,
            timestamp: block.timestamp
        }));

        creatorRoyaltyIndices[creator].push(recordIndex);

        emit RoyaltyDeposited(tokenId, creator, msg.value);
    }

    /// @notice Allows direct ETH deposits for royalty pool
    /// @dev Can be used for manual top-ups or external royalty sources
    receive() external payable {
        // Accept ETH, but don't auto-distribute
        // This allows the contract to receive funds that can be manually distributed
    }

    /*//////////////////////////////////////////////////////////////
                        ROYALTY WITHDRAWAL
    //////////////////////////////////////////////////////////////*/

    /// @notice Withdraw pending royalties
    /// @dev Creator can withdraw their accumulated royalties
    function withdrawRoyalties() external nonReentrant whenNotPaused {
        address creator = msg.sender;
        uint256 amount = pendingRoyalties[creator];

        if (amount == 0) revert InsufficientBalance();
        if (amount < MIN_WITHDRAWAL) revert BelowMinimumWithdrawal();

        // Update state before transfer (CEI pattern)
        pendingRoyalties[creator] = 0;
        totalRoyaltiesWithdrawn[creator] += amount;

        // Transfer funds
        (bool success, ) = payable(creator).call{value: amount}("");
        if (!success) revert TransferFailed();

        emit RoyaltyWithdrawn(creator, amount);
    }

    /// @notice Withdraw specific amount of royalties
    /// @param amount Amount to withdraw
    function withdrawAmount(uint256 amount) external nonReentrant whenNotPaused {
        address creator = msg.sender;
        uint256 pending = pendingRoyalties[creator];

        if (amount == 0) revert InvalidAmount();
        if (amount > pending) revert InsufficientBalance();
        if (amount < MIN_WITHDRAWAL) revert BelowMinimumWithdrawal();

        // Update state before transfer
        pendingRoyalties[creator] -= amount;
        totalRoyaltiesWithdrawn[creator] += amount;

        // Transfer funds
        (bool success, ) = payable(creator).call{value: amount}("");
        if (!success) revert TransferFailed();

        emit RoyaltyWithdrawn(creator, amount);
    }

    /*//////////////////////////////////////////////////////////////
                        EMERGENCY FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Withdraw royalties on behalf of a creator (emergency only)
    /// @dev Only owner can call this for emergency situations
    /// @param creator Creator address
    function emergencyWithdraw(address creator) external onlyOwner nonReentrant {
        uint256 amount = pendingRoyalties[creator];
        if (amount == 0) revert InsufficientBalance();

        pendingRoyalties[creator] = 0;
        totalRoyaltiesWithdrawn[creator] += amount;

        (bool success, ) = payable(creator).call{value: amount}("");
        if (!success) revert TransferFailed();

        emit RoyaltyWithdrawn(creator, amount);
    }

    /*//////////////////////////////////////////////////////////////
                        VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Get pending royalties for a creator
    /// @param creator Creator address
    /// @return amount Pending royalty amount
    function getPendingRoyalties(address creator) external view returns (uint256) {
        return pendingRoyalties[creator];
    }

    /// @notice Get total royalties ever received by a creator
    /// @param creator Creator address
    /// @return amount Total received amount
    function getTotalReceived(address creator) external view returns (uint256) {
        return totalRoyaltiesReceived[creator];
    }

    /// @notice Get total royalties withdrawn by a creator
    /// @param creator Creator address
    /// @return amount Total withdrawn amount
    function getTotalWithdrawn(address creator) external view returns (uint256) {
        return totalRoyaltiesWithdrawn[creator];
    }

    /// @notice Get royalty distribution history for a creator
    /// @param creator Creator address
    /// @return records Array of royalty records
    function getCreatorRoyaltyHistory(address creator)
        external
        view
        returns (RoyaltyRecord[] memory)
    {
        uint256[] memory indices = creatorRoyaltyIndices[creator];
        RoyaltyRecord[] memory records = new RoyaltyRecord[](indices.length);

        for (uint256 i = 0; i < indices.length; i++) {
            records[i] = royaltyHistory[indices[i]];
        }

        return records;
    }

    /// @notice Get total number of royalty distributions
    /// @return count Total distribution count
    function getRoyaltyHistoryCount() external view returns (uint256) {
        return royaltyHistory.length;
    }

    /// @notice Get royalty statistics for a creator
    /// @param creator Creator address
    /// @return pending Current pending balance
    /// @return totalReceived Total ever received
    /// @return totalWithdrawn Total ever withdrawn
    /// @return distributionCount Number of royalty payments received
    function getCreatorStats(address creator)
        external
        view
        returns (
            uint256 pending,
            uint256 totalReceived,
            uint256 totalWithdrawn,
            uint256 distributionCount
        )
    {
        return (
            pendingRoyalties[creator],
            totalRoyaltiesReceived[creator],
            totalRoyaltiesWithdrawn[creator],
            creatorRoyaltyIndices[creator].length
        );
    }

    /// @notice Get contract balance
    /// @return balance Total ETH held by contract
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /*//////////////////////////////////////////////////////////////
                        PAUSE FUNCTIONALITY
    //////////////////////////////////////////////////////////////*/

    /// @notice Pause royalty operations
    function pause() external onlyOwner {
        _pause();
    }

    /// @notice Unpause royalty operations
    function unpause() external onlyOwner {
        _unpause();
    }
}
