'use client';

import { useState, useEffect } from 'react';
import { 
  useAccount, 
  useReadContract, 
  useWriteContract, 
  useWaitForTransactionReceipt,
  useSwitchChain 
} from 'wagmi';
import { formatUnits } from 'viem';
import { sepolia } from 'wagmi/chains';
import { FAUCET_CONTRACT_ADDRESS, FAUCET_ABI } from '../app/config/contract';

export function FaucetButton() {
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected, chain } = useAccount();
  const { switchChain, isPending: isSwitchingChain } = useSwitchChain();

  // Prevent Hydration Mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isWrongNetwork = isConnected && chain?.id !== sepolia.id;

  // 1. Read User's PTK Token Balance
  const { data: rawUserBalance, refetch: refetchUserBalance } = useReadContract({
    address: FAUCET_CONTRACT_ADDRESS,
    abi: FAUCET_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address && !isWrongNetwork),
    },
  });

  // 2. Read Faucet Contract's Own PTK Reserve Pool Balance
  const { data: rawFaucetBalance, refetch: refetchFaucetBalance } = useReadContract({
    address: FAUCET_CONTRACT_ADDRESS,
    abi: FAUCET_ABI,
    functionName: 'balanceOf',
    args: [FAUCET_CONTRACT_ADDRESS],
    query: {
      enabled: Boolean(!isWrongNetwork),
    },
  });

  // Handle Token Request
  const { data: hash, isPending, writeContract, error: writeError } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed, error: confirmError } = useWaitForTransactionReceipt({ 
    hash 
  });

  // Refresh both balances when a mint/claim transaction succeeds
  useEffect(() => {
    if (isConfirmed) {
      refetchUserBalance();
      refetchFaucetBalance();
    }
  }, [isConfirmed, refetchUserBalance, refetchFaucetBalance]);

  // Add Token to Wallet Extension
  const handleAddTokenToWallet = async () => {
    const ethereum = typeof window !== 'undefined' ? (window as any).ethereum : null;

    if (ethereum) {
      try {
        await ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: FAUCET_CONTRACT_ADDRESS,
              symbol: 'PTK',
              decimals: 18,
            },
          },
        });
      } catch (error) {
        console.error('Error adding token to wallet:', error);
      }
    } else {
      alert('MetaMask or Web3 wallet extension not detected!');
    }
  };

  const handleRequestTokens = () => {
    writeContract({
      address: FAUCET_CONTRACT_ADDRESS,
      abi: FAUCET_ABI,
      functionName: 'requestTokens',
    });
  };

  // Helper to format 18-decimal balances safely
  const formatBalance = (raw: unknown) => {
    if (raw === undefined || raw === null) return '0';
    return Number(formatUnits(BigInt(raw as string | number | bigint), 18)).toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const userBalanceFormatted = formatBalance(rawUserBalance);
  const faucetBalanceFormatted = formatBalance(rawFaucetBalance);

  return (
    <div className="flex flex-col items-center gap-4 my-6 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl max-w-md w-full">
      <h3 className="text-xl font-bold text-zinc-100 tracking-tight">
        Claim Test Tokens
      </h3>

      {/* Network Warning Banner */}
      {isMounted && isWrongNetwork && (
        <div className="w-full bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex flex-col items-center gap-2 text-center text-xs text-amber-300">
          <p>You are connected to <strong>{chain?.name || 'the wrong network'}</strong>. Please switch to Sepolia to request tokens.</p>
          <button
            onClick={() => switchChain({ chainId: sepolia.id })}
            disabled={isSwitchingChain}
            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {isSwitchingChain ? 'Switching Network...' : 'Switch to Sepolia'}
          </button>
        </div>
      )}

      {/* Faucet Pool Reserve Display */}
      {isMounted && !isWrongNetwork && (
        <div className="w-full bg-zinc-950/40 border border-zinc-800/80 rounded-xl p-3 flex justify-between items-center text-xs text-zinc-400">
          <span>Faucet Pool Reserve:</span>
          <span className="font-mono font-semibold text-zinc-200">
            {faucetBalanceFormatted} PTK
          </span>
        </div>
      )}

      {/* Live User Token Balance Display */}
      {isMounted && isConnected && !isWrongNetwork && (
        <div className="w-full bg-zinc-950/70 border border-zinc-800 rounded-xl p-3 flex flex-col gap-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-zinc-400">Your Balance:</span>
            <span className="font-mono font-bold text-cyan-400 text-base">
              {userBalanceFormatted} PTK
            </span>
          </div>
          
          <button
            onClick={handleAddTokenToWallet}
            className="text-xs text-zinc-400 hover:text-cyan-300 underline self-end transition-colors"
          >
            + Add PTK to MetaMask
          </button>
        </div>
      )}

      <p className="text-sm text-zinc-400 text-center">
        Get free Sepolia PTK tokens sent directly to your connected wallet.
      </p>

      {/* Action Button */}
      {isWrongNetwork ? (
        <button
          onClick={() => switchChain({ chainId: sepolia.id })}
          disabled={isSwitchingChain}
          className="w-full py-3.5 px-6 mt-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl shadow-lg transition-all duration-200"
        >
          {isSwitchingChain ? 'Switch Network to Sepolia' : 'Switch Network to Sepolia'}
        </button>
      ) : (
        <button
          onClick={handleRequestTokens}
          disabled={isPending || isConfirming || (!isMounted || !isConnected)}
          className="w-full py-3.5 px-6 mt-2 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-xl shadow-lg hover:shadow-cyan-500/10 transition-all duration-200 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed"
        >
          {!isMounted || !isConnected 
            ? 'Connect Wallet to Claim' 
            : isPending 
            ? 'Check Wallet...' 
            : isConfirming 
            ? 'Minting Tokens...' 
            : 'Request Tokens'}
        </button>
      )}

      {/* Transaction Success Link */}
      {isConfirmed && hash && (
        <p className="text-emerald-400 text-xs mt-2 font-mono text-center">
          🎉 Tokens Claimed!{' '}
          <a
            href={`https://sepolia.etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-300"
          >
            View on Etherscan ↗
          </a>
        </p>
      )}

      {/* Error Output */}
      {(writeError || confirmError) && (
        <p className="text-rose-400 text-xs text-center font-mono mt-1">
          {(writeError || confirmError)?.message.slice(0, 80)}...
        </p>
      )}
    </div>
  );
}