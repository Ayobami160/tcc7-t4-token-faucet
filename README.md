# Web3 Token Fauce

A decentralized application (dApp) built for the Ethereum Sepolia testnet as part of the TechCrush Bootcamp C7 capstone project. This application allows users to request test tokens from a smart contract.

## Key Features

* Wallet Integration: Seamless connection with MetaMask via Ethers.js.
* Token Claiming: Automated interaction with the smart contract to dispense tokens.
* Network Management: Built for Ethereum Sepolia testnet compatibility.
* Responsive UI: Optimized for user experience using Tailwind CSS and Next.js.

## Tech Stack

* Frontend: Next.js 16, React, Tailwind CSS
* Web3 Library: Ethers.js (v6)
* Blockchain: Solidity
* Network: Ethereum Sepolia

## Prerequisites

* Node.js (v18 or higher)
* MetaMask Browser Extension
* Sepolia Testnet ETH (for gas fees)
* 

## Contract Details

* Network: Ethereum Sepolia
* Contract Address: 0x19e50CCbE5B073cefF40E3C433eaFc94C71f05fC
* Technical Implementation:
    * Implemented strict checksum validation by forcing address normalization (`.toLowerCase()`) before interaction to resolve `INVALID_ARGUMENT` errors.
    * Integrated Ethers.js (v6) for secure contract instantiation and transaction handling.
    * Successfully deployed and verified interaction on the Sepolia testnet.
* ABI: Defined in app/page.tsx

## Getting Started

1. Clone the repository:
   ```bash
   git clone [https://github.com/Ayobami160/tcc-t4-token-faucet.git](https://github.com/Ayobami160/tcc-t4-token-faucet.git)
   cd tcc-t4-token-faucet