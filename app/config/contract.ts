// app/config/contract.ts

// Deployed Faucet Contract Address on Sepolia
export const FAUCET_CONTRACT_ADDRESS = "0x73F8c388064bc9e3ec52F16EC76922691ec92072" as `0x${string}`;

// Contract ABI definition
export const FAUCET_ABI = [
  {
    type: "function",
    name: "requestTokens",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "drip",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view"
  }
] as const;