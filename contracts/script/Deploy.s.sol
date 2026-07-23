// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {ProjectToken} from "../src/ProjectToken.sol";
import {TokenFaucet} from "../src/TokenFaucet.sol";

contract DeployContracts is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        ProjectToken token = new ProjectToken(1000000);
        TokenFaucet faucet = new TokenFaucet(address(token));

        vm.stopBroadcast();
    }
}