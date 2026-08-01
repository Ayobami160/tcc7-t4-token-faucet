# Web3 Token Faucet - TechCrush Bootcamp C7

This decentralized application (dApp) is developed for the Ethereum Sepolia testnet as a key component of the TechCrush Bootcamp C7 capstone project. The platform provides a secure interface for users to request and receive test tokens directly from a deployed smart contract.

**Live Demo:** 

## 🚀 Key Features
* **Wallet Integration**: Seamless, secure connectivity with MetaMask via Ethers.js.
* **Automated Token Claiming**: Facilitates automated interactions with smart contracts for efficient token distribution.
* **Network Optimization**: Built specifically for Ethereum Sepolia testnet compatibility.
* **Responsive UI**: Designed for an intuitive user experience utilizing Tailwind CSS and Next.js.

## 🛠 Tech Stack
* **Frontend**: Next.js 16, React, Tailwind CSS
* **Web3 Library**: Ethers.js (v6)
* **Blockchain**: Solidity
* **Network**: Ethereum Sepolia

## ⚙️ Prerequisites & Setup
* **Node.js**: v18 or higher
* **MetaMask Browser Extension**
* **Sepolia Testnet ETH**: Required for gas fee coverage

### Critical Configuration Note
* **File Formatting**: To prevent "Failed to decode" errors during script execution, ensure your `.env` files utilize **LF (Line Feed)** endings. If working within a Windows/WSL environment, please verify the line ending setting in the bottom-right corner of VS Code and toggle to **LF** if currently set to CRLF.

## 📜 Contract Details
* **Network**: Ethereum Sepolia
* **Faucet Contract Address**: `0x5a48943cF74FD2D5d1058bD45624199024F80882`
* **Token Contract Address**: `0xB791178104D7BB15144c29071De764208604F15E`
* **Technical Implementation Highlights**:
    * Implemented administrative minting functions to maintain and manage faucet supply levels.
    * Integrated real-time token information display logic for enhanced balance tracking.
    * Resolved address normalization errors via `.toLowerCase()` for strict checksum validation.
    * Successfully deployed and verified on-chain functionality on the Sepolia testnet.

## 🏁 Getting Started

### 1. Installation
Clone the repository and install the necessary dependencies:

```bash
git clone [https://github.com/Ayobami160/tcc-t4-token-faucet.git](https://github.com/Ayobami160/tcc-t4-token-faucet.git)
cd tcc-t4-token-faucet
npm install

Starting the Application
npm run dev

The application will be avaliable at 
http://localhost:3000⁠.