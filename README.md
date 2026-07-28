# Web3 Token Faucet - TechCrush Bootcamp C7

A decentralized application (dApp) built for the Ethereum Sepolia testnet as part of the TechCrush Bootcamp C7 capstone project. This application allows users to request test tokens from a smart contract.

**Live Demo:** https://tcc7-t4-token-faucet-yezt-cx4fwrrcw-token-faucet.vercel.app/

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

## Contract Details

* Network: Ethereum Sepolia
* Faucet Contract Address: `0x19e50CCbE5B073cefF40E3C433eaFc94C71f05fC`
* Token Contract Address: `0x1934b6Cf15A316ebadE9c1A197FAf471615CBdC7`
* Technical Implementation:
    * Implemented administrative minting functions to manage faucet supply.
    * Integrated token info display logic for real-time balance tracking.
    * Resolved address normalization errors using `.toLowerCase()` for strict checksum validation.
    * Successfully deployed and verified interaction on the Sepolia testnet.
* ABI: Defined in app/page.tsx

## Getting Started

1. Clone the repository:
   ```bash
   git clone [https://github.com/Ayobami160/tcc-t4-token-faucet.git](https://github.com/Ayobami160/tcc-t4-token-faucet.git)
   cd tcc-t4-token-faucet
   