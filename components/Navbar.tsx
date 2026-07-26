'use client';

import WalletConnect from "./WalletConnect";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 text-white">
      <h1 className="text-xl font-bold">Web3 Capstone Project</h1>
      <WalletConnect />
    </nav>
  );
}