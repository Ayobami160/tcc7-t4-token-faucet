// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../contracts/src/ProjectToken.sol";

contract FundFaucet is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address tokenAddress = vm.envAddress("TOKEN_ADDRESS");
        address faucetAddress = vm.envAddress("FAUCET_ADDRESS");

        vm.startBroadcast(deployerPrivateKey);

        ProjectToken token = ProjectToken(tokenAddress);
        
        // This is the direct transfer
        token.transfer(faucetAddress, 1000 * 10**18);

        vm.stopBroadcast();
    }
}