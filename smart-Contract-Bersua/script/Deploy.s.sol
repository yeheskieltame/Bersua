// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import "forge-std/Script.sol";
import "../src/CulturalAssetNFT.sol";
import "../src/LicenseManager.sol";
import "../src/Marketplace.sol";
import "../src/RoyaltyDistributor.sol";

/// @title Deploy Script
/// @notice Deploys all Bersua contracts in correct order
/// @dev Use with: forge script script/Deploy.s.sol:DeployScript --rpc-url <RPC> --broadcast
contract DeployScript is Script {
    // Deployment addresses will be logged
    CulturalAssetNFT public nft;
    LicenseManager public licenseManager;
    Marketplace public marketplace;
    RoyaltyDistributor public royaltyDistributor;

    // Base Sepolia Trusted Forwarder (for gasless transactions)
    // Note: Update this address with actual Base trusted forwarder
    // For now using a placeholder - replace with Biconomy/Gelato forwarder
    address public constant TRUSTED_FORWARDER = address(0x1234567890123456789012345678901234567890);

    function run() external {
        // Get deployer private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);

        console.log("===========================================");
        console.log("Deploying Bersua Smart Contracts");
        console.log("===========================================");
        console.log("Deployer:", deployer);
        console.log("Chain ID:", block.chainid);
        console.log("");

        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy CulturalAssetNFT
        console.log("1. Deploying CulturalAssetNFT...");
        nft = new CulturalAssetNFT();
        console.log("   CulturalAssetNFT deployed at:", address(nft));
        console.log("");

        // 2. Deploy LicenseManager
        console.log("2. Deploying LicenseManager...");
        licenseManager = new LicenseManager();
        console.log("   LicenseManager deployed at:", address(licenseManager));
        console.log("");

        // 3. Deploy Marketplace
        console.log("3. Deploying Marketplace...");
        marketplace = new Marketplace(
            address(nft),
            address(licenseManager),
            TRUSTED_FORWARDER,
            deployer // Fee recipient = deployer initially
        );
        console.log("   Marketplace deployed at:", address(marketplace));
        console.log("");

        // 4. Deploy RoyaltyDistributor
        console.log("4. Deploying RoyaltyDistributor...");
        royaltyDistributor = new RoyaltyDistributor(address(nft));
        console.log("   RoyaltyDistributor deployed at:", address(royaltyDistributor));
        console.log("");

        // 5. Configure contracts
        console.log("5. Configuring contracts...");

        // Set marketplace in NFT contract
        nft.setMarketplace(address(marketplace));
        console.log("   NFT: Marketplace set");

        // Set marketplace in LicenseManager
        licenseManager.setMarketplace(address(marketplace));
        console.log("   LicenseManager: Marketplace set");

        // Set marketplace in RoyaltyDistributor
        royaltyDistributor.setMarketplace(address(marketplace));
        console.log("   RoyaltyDistributor: Marketplace set");

        // Set royalty distributor in Marketplace
        marketplace.setRoyaltyDistributor(address(royaltyDistributor));
        console.log("   Marketplace: RoyaltyDistributor set");

        console.log("");

        vm.stopBroadcast();

        // Print deployment summary
        console.log("===========================================");
        console.log("DEPLOYMENT SUMMARY");
        console.log("===========================================");
        console.log("CulturalAssetNFT:     ", address(nft));
        console.log("LicenseManager:       ", address(licenseManager));
        console.log("Marketplace:          ", address(marketplace));
        console.log("RoyaltyDistributor:   ", address(royaltyDistributor));
        console.log("===========================================");
        console.log("");
        console.log("Next steps:");
        console.log("1. Verify contracts on Basescan");
        console.log("2. Update TRUSTED_FORWARDER with actual Biconomy/Gelato address");
        console.log("3. Test minting and purchasing on testnet");
        console.log("4. Update frontend with contract addresses");
        console.log("===========================================");
    }
}
