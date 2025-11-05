// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "forge-std/Test.sol";
import "../src/CulturalAssetNFT.sol";
import "../src/LicenseManager.sol";
import "../src/Marketplace.sol";
import "../src/RoyaltyDistributor.sol";

contract MarketplaceTest is Test {
    CulturalAssetNFT public nft;
    LicenseManager public licenseManager;
    Marketplace public marketplace;
    RoyaltyDistributor public royaltyDistributor;

    address public owner = address(1);
    address public creator = address(2);
    address public buyer = address(3);
    address public feeRecipient = address(4);
    address public trustedForwarder = address(5);

    uint256 public constant BASE_PRICE = 1 ether;
    uint96 public constant ROYALTY_BPS = 2000; // 20%

    function setUp() public {
        vm.startPrank(owner);

        // Deploy all contracts
        nft = new CulturalAssetNFT();
        licenseManager = new LicenseManager();
        marketplace = new Marketplace(
            address(nft),
            address(licenseManager),
            trustedForwarder,
            feeRecipient
        );
        royaltyDistributor = new RoyaltyDistributor(address(nft));

        // Configure contracts
        nft.setMarketplace(address(marketplace));
        licenseManager.setMarketplace(address(marketplace));
        royaltyDistributor.setMarketplace(address(marketplace));
        marketplace.setRoyaltyDistributor(address(royaltyDistributor));

        vm.stopPrank();

        // Fund test accounts
        vm.deal(buyer, 100 ether);
        vm.deal(creator, 10 ether);
    }

    function testMintAndList() public {
        vm.prank(creator);

        uint256 tokenId = marketplace.mintAndList(
            "Wayang Gatot Kaca 3D",
            CulturalAssetNFT.AssetType.MODEL_3D,
            CulturalAssetNFT.Culture.JAWA,
            BASE_PRICE,
            ROYALTY_BPS,
            "ipfs://QmTest123"
        );

        assertEq(tokenId, 1);
        assertEq(nft.ownerOf(tokenId), creator);

        Marketplace.Listing memory listing = marketplace.getListing(tokenId);
        assertTrue(listing.active);
        assertEq(listing.basePrice, BASE_PRICE);
        assertEq(listing.seller, creator);
    }

    function testPurchaseCommercialLicense() public {
        // Creator mints and lists
        vm.prank(creator);
        uint256 tokenId = marketplace.mintAndList(
            "Gamelan Music Pack",
            CulturalAssetNFT.AssetType.MUSIK,
            CulturalAssetNFT.Culture.BALI,
            BASE_PRICE,
            ROYALTY_BPS,
            "ipfs://QmMusic456"
        );

        // Calculate commercial price (100% of base price)
        uint256 commercialPrice = licenseManager.calculateTierPrice(
            BASE_PRICE,
            LicenseManager.LicenseTier.COMMERCIAL
        );

        // Buyer purchases commercial license
        vm.prank(buyer);
        marketplace.purchaseLicense{value: commercialPrice}(
            tokenId,
            LicenseManager.LicenseTier.COMMERCIAL
        );

        // Verify license was issued
        bool hasLicense = licenseManager.hasValidLicense(
            tokenId,
            buyer,
            LicenseManager.LicenseTier.COMMERCIAL
        );
        assertTrue(hasLicense);

        // Verify buyer can use commercially
        assertTrue(licenseManager.canUseCommercially(tokenId, buyer));
    }

    function testPurchaseUnlimitedLicense() public {
        vm.prank(creator);
        uint256 tokenId = marketplace.mintAndList(
            "Batik Pattern Pack",
            CulturalAssetNFT.AssetType.VISUAL_2D,
            CulturalAssetNFT.Culture.JAWA,
            BASE_PRICE,
            ROYALTY_BPS,
            "ipfs://QmBatik789"
        );

        // Calculate unlimited price (250% of base price)
        uint256 unlimitedPrice = licenseManager.calculateTierPrice(
            BASE_PRICE,
            LicenseManager.LicenseTier.UNLIMITED
        );

        vm.prank(buyer);
        marketplace.purchaseLicense{value: unlimitedPrice}(
            tokenId,
            LicenseManager.LicenseTier.UNLIMITED
        );

        // Verify buyer has resale rights
        assertTrue(licenseManager.canResell(tokenId, buyer));
    }

    function testRoyaltyPayment() public {
        vm.prank(creator);
        uint256 tokenId = marketplace.mintAndList(
            "Legenda Sangkuriang",
            CulturalAssetNFT.AssetType.CERITA,
            CulturalAssetNFT.Culture.SUNDA,
            BASE_PRICE,
            ROYALTY_BPS,
            "ipfs://QmStory999"
        );

        uint256 purchasePrice = licenseManager.calculateTierPrice(
            BASE_PRICE,
            LicenseManager.LicenseTier.COMMERCIAL
        );

        uint256 creatorBalanceBefore = creator.balance;

        vm.prank(buyer);
        marketplace.purchaseLicense{value: purchasePrice}(
            tokenId,
            LicenseManager.LicenseTier.COMMERCIAL
        );

        // Creator should receive payment (minus fees and royalty)
        assertTrue(creator.balance > creatorBalanceBefore);
    }

    function testCannotPurchaseWithInsufficientFunds() public {
        vm.prank(creator);
        uint256 tokenId = marketplace.mintAndList(
            "Test Asset",
            CulturalAssetNFT.AssetType.MODEL_3D,
            CulturalAssetNFT.Culture.JAWA,
            BASE_PRICE,
            ROYALTY_BPS,
            "ipfs://QmTest"
        );

        vm.prank(buyer);
        vm.expectRevert(Marketplace.InsufficientPayment.selector);
        marketplace.purchaseLicense{value: 0.5 ether}(
            tokenId,
            LicenseManager.LicenseTier.COMMERCIAL
        );
    }

    function testMultipleBuyersCanPurchaseDifferentTiers() public {
        address buyer2 = address(6);
        vm.deal(buyer2, 100 ether);

        vm.prank(creator);
        uint256 tokenId = marketplace.mintAndList(
            "Multi-License Asset",
            CulturalAssetNFT.AssetType.MUSIK,
            CulturalAssetNFT.Culture.SULAWESI,
            BASE_PRICE,
            ROYALTY_BPS,
            "ipfs://QmMulti"
        );

        // Buyer 1 purchases Personal
        uint256 personalPrice = licenseManager.calculateTierPrice(
            BASE_PRICE,
            LicenseManager.LicenseTier.PERSONAL
        );
        vm.prank(buyer);
        marketplace.purchaseLicense{value: personalPrice}(
            tokenId,
            LicenseManager.LicenseTier.PERSONAL
        );

        // Buyer 2 purchases Commercial
        uint256 commercialPrice = licenseManager.calculateTierPrice(
            BASE_PRICE,
            LicenseManager.LicenseTier.COMMERCIAL
        );
        vm.prank(buyer2);
        marketplace.purchaseLicense{value: commercialPrice}(
            tokenId,
            LicenseManager.LicenseTier.COMMERCIAL
        );

        // Both should have their respective licenses
        assertTrue(licenseManager.hasValidLicense(tokenId, buyer, LicenseManager.LicenseTier.PERSONAL));
        assertTrue(licenseManager.hasValidLicense(tokenId, buyer2, LicenseManager.LicenseTier.COMMERCIAL));

        // Only buyer2 can use commercially
        assertFalse(licenseManager.canUseCommercially(tokenId, buyer));
        assertTrue(licenseManager.canUseCommercially(tokenId, buyer2));
    }

    function testGetActiveListings() public {
        vm.startPrank(creator);

        marketplace.mintAndList("Asset 1", CulturalAssetNFT.AssetType.MODEL_3D, CulturalAssetNFT.Culture.JAWA, BASE_PRICE, ROYALTY_BPS, "ipfs://1");
        marketplace.mintAndList("Asset 2", CulturalAssetNFT.AssetType.MUSIK, CulturalAssetNFT.Culture.BALI, BASE_PRICE, ROYALTY_BPS, "ipfs://2");
        marketplace.mintAndList("Asset 3", CulturalAssetNFT.AssetType.VISUAL_2D, CulturalAssetNFT.Culture.SUNDA, BASE_PRICE, ROYALTY_BPS, "ipfs://3");

        vm.stopPrank();

        uint256[] memory activeListings = marketplace.getActiveListings();
        assertEq(activeListings.length, 3);
    }
}
