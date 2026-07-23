// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/TokenFaucet.sol";
import "../src/ProjectToken.sol";

contract TokenFaucetTest is Test {
    TokenFaucet public faucet;
    ProjectToken public token;

    address public user = address(0x1);
    address public owner = address(this);

    function setUp() public {
        // Deploy the dependencies
        token = new ProjectToken(1000000);

        // Deploy the Faucet with the token address
        faucet = new TokenFaucet(address(token));

        // Set the drip amount so the "empty" check works
        faucet.setDripAmount(100);

        // Seed the faucet with 1000 tokens so it has a balance to dispense
        token.transfer(address(faucet), 1000 * 10**18);
    }

    function test_FaucetDeploysCorrectly() public {
        assert(address(faucet) != address(0));
        assertEq(token.balanceOf(address(faucet)), 1000 * 10**18);
    }

    function test_RequestTokensUpdatesUserBalance() public {
        uint256 initialBalance = token.balanceOf(user);
        
        // Simulate a user calling the function
        vm.prank(user);
        faucet.requestTokens();
        
        // Check that the user balance increased
        assertGt(token.balanceOf(user), initialBalance);
    }

    function test_RevertWhenFaucetIsEmpty() public {
        faucet.setDripAmount(1000000000 * 10**18);

        vm.expectRevert();
        vm.prank(user);
        faucet.requestTokens();
    }
}