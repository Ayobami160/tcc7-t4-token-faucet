// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../src/ProjectToken.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TokenFaucet is Ownable, ReentrancyGuard {
    IERC20 public token;

    uint256 public dripAmount = 100 * 10**18;
    uint256 public cooldownTime = 5 minutes;

    mapping(address => uint256) public nextAccessTime;

    event TokensDispensed(address indexed recipient, uint256 amount);
    event DripAmountUpdated(uint256 newAmount);
    event CooldownTimeUpdated(uint256 newCooldown);
    event TokensWithdrawn(address indexed owner, uint256 amount);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        require(_tokenAddress != address(0), "Invalid token address");
        token = IERC20(_tokenAddress);
    }

    // Professional standard: nonReentrant prevents draining attacks
    function requestTokens() public {
        // Safety check: ensure the faucet has enough tokens
        require(token.balanceOf(address(this)) >= dripAmount, "Faucet is empty");

        // Ensure the user hasn't requested tokens too recently
        require(block.timestamp >= nextAccessTime[msg.sender], "Cooldown active.");

        // Update the user's next allowed access time
        nextAccessTime[msg.sender] = block.timestamp + cooldownTime;

        // Transfer tokens to the user
        token.transfer(msg.sender, dripAmount);
    }

    function setDripAmount(uint256 _newAmount) external onlyOwner {
        dripAmount = _newAmount;
        emit DripAmountUpdated(_newAmount);
    }

    function setCooldownTime(uint256 _newCooldownSeconds) external onlyOwner {
        cooldownTime = _newCooldownSeconds;
        emit CooldownTimeUpdated(_newCooldownSeconds);
    }

    function withdrawTokens() external onlyOwner nonReentrant {
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw.");

        require(token.transfer(owner(), balance), "Transfer failed.");
        emit TokensWithdrawn(owner(), balance);
    }
}