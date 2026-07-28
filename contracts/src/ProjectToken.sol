// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProjectToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("Project Token", "PTK") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function getTokenInfo() public view returns (string memory name, string memory symbol, uint256 totalSupply) {
        return ("Project Token", "PTK", totalSupply);
    }
}