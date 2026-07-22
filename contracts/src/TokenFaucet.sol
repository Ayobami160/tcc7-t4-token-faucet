// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract ProjectToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("Project Token", "PTK") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}

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
    function requestTokens() external nonReentrant {
        require(block.timestamp >= nextAccessTime[msg.sender], "Cooldown active.");
        require(token.balanceOf(address(this)) >= dripAmount, "Faucet empty.");

        nextAccessTime[msg.sender] = block.timestamp + cooldownTime;

        require(token.transfer(msg.sender, dripAmount), "Transfer failed.");

        emit TokensDispensed(msg.sender, dripAmount);
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