// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../src/ProjectToken.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TokenFaucet is Ownable, ReentrancyGuard {
    IERC20 public token;

    uint256 public cooldownTime = 5 minutes;
    mapping(address => uint256) public nextAccessTime;

    event TokensDispensed(address indexed recipient, uint256 amount);
    event CooldownTimeUpdated(uint256 newCooldown);
    event TokensWithdrawn(address indexed owner, uint256 amount);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        require(_tokenAddress != address(0), "Invalid token address");
        token = IERC20(_tokenAddress);
    }

    function requestTokens(uint256 _amount) public nonReentrant {
        require(_amount > 0, "Amount must be greater than 0");
        require(_amount <= 500 * 10**18, "Amount exceeds max limit");
        require(token.balanceOf(address(this)) >= _amount, "Faucet is empty");
        // require(block.timestamp >= nextAccessTime[msg.sender], "Cooldown active.");

        // nextAccessTime[msg.sender] = block.timestamp + cooldownTime;

        token.transfer(msg.sender, _amount);

        emit TokensDispensed(msg.sender, _amount);
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