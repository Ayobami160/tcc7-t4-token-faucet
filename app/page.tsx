'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {
    ArrowRight,
    ChevronDown,
    Copy,
    Coins,
    Hourglass,
    TrendingUp,
    Wallet,
    Check,
} from 'lucide-react';
import { FAUCET_ADDRESS, FAUCET_ABI } from '../constants/contractDetails';

const networks = [
    { id: 'ethereum-sepolia', name: 'Ethereum Sepolia', logo: '♦️' },
];

export default function TokenFaucet() {
    const [amount, setAmount] = useState('50');
    const [account, setAccount] = useState('');
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 12 });
    const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
    const [networkOpen, setNetworkOpen] = useState(false);

    const connectWallet = async () => {
        if (typeof window !== 'undefined' && window.ethereum) {
            try {
                const accounts = (await window.ethereum.request({ method: 'eth_requestAccounts' })) as string[];
                if (accounts && accounts.length > 0) {
                    setAccount(accounts[0]);
                }
            } catch (error) {
                console.error("User denied account access");
            }
        } else {
            alert("Please install MetaMask!");
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) return { hours: 23, minutes: 59, seconds: 59 };
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
                return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleClaim = async () => {
        if (!account) return alert("Connect wallet first!");
        
        setLoading(true);
        try {
            const provider = new ethers.BrowserProvider(window.ethereum as any);
            const signer = await provider.getSigner();
            
            const cleanAddress = ethers.getAddress(FAUCET_ADDRESS.toLowerCase());
            const contract = new ethers.Contract(cleanAddress, FAUCET_ABI, signer);
            
            const amountInWei = ethers.parseEther(amount);
            
            const tx = await contract.requestTokens(amountInWei);
            await tx.wait();
            
            alert("Tokens requested successfully!");
        } catch (error: any) {
            console.error("Claim failed", error);
            alert("Claim failed: " + (error.reason || error.message || "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#080808] text-white">
            <div className="relative mx-auto flex min-h-screen w-full max-w-[1180px] items-center justify-center px-5 py-10 lg:px-8">
                <div className="grid w-full max-w-[940px] grid-cols-1 gap-7 lg:grid-cols-[1fr_1fr]">
                    <section className="rounded-[18px] border border-white/[0.12] bg-[#0b0b0b]/90 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-7">
                        
                        <div className="mb-7 flex items-center justify-between">
                            <div>
                                <h1 className="text-[27px] font-semibold tracking-[-0.8px] text-[#ffc21a]">Claim Test Tokens</h1>
                            </div>
                            <button 
                                onClick={connectWallet}
                                className="flex items-center gap-2 rounded-lg bg-[#1a1a1a] px-4 py-2 text-xs border border-white/10 hover:border-yellow-500/50 transition"
                            >
                                <Wallet size={14} className={account ? "text-green-500" : "text-white"} />
                                {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
                            </button>
                        </div>

                        <div className="relative mb-5">
                            <label className="mb-2 block text-[12px] font-medium text-white/60">Network</label>
                            <button
                                type="button"
                                onClick={() => setNetworkOpen((prev) => !prev)}
                                className="flex h-[38px] w-full items-center justify-between rounded-lg border border-yellow-600/40 bg-[#101010] px-3.5 text-sm transition hover:border-yellow-500/70"
                            >
                                <span className="flex items-center gap-2.5">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2b2d66] text-[10px] font-semibold text-white">
                                        {selectedNetwork.logo}
                                    </span>
                                    <span className="text-white/85">{selectedNetwork.name}</span>
                                </span>
                                <ChevronDown size={16} className={`text-white/50 transition-transform ${networkOpen ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block text-[12px] font-medium text-white/60">Recipient Wallet Address</label>
                            <div className="flex h-[38px] items-center rounded-lg border border-yellow-600/40 bg-[#101010] px-3.5">
                                <input
                                    type="text"
                                    placeholder="Enter wallet address (0x...)"
                                    value={account}
                                    onChange={(e) => setAccount(e.target.value)}
                                    className="min-w-0 flex-1 bg-transparent text-sm text-white/85 outline-none"
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="mb-2 block text-[12px] font-medium text-white/60">Amount (ETH)</label>
                            <div className="flex h-[38px] items-center rounded-lg border border-yellow-600/40 bg-[#101010] px-3.5">
                                <input
                                    type="number"
                                    placeholder="50"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="min-w-0 flex-1 bg-transparent text-sm text-white/85 outline-none"
                                />
                                <span className="text-white/40 text-xs">ETH</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleClaim}
                            disabled={loading || !account}
                            className="group flex h-[45px] w-full items-center justify-center gap-3 rounded-lg bg-[#ffbd08] text-sm font-semibold text-[#181000] transition hover:bg-[#ffca2c] active:scale-[0.99] disabled:opacity-50"
                        >
                            <span>{loading ? "Claiming..." : "Claim Tokens"}</span>
                            <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </section>

                    <section className="flex flex-col gap-3">
                        <DashboardCard>
                            <div>
                                <p className="text-[11px] text-white/65">Faucet Balance</p>
                                <p className="mt-1 text-[23px] font-semibold text-[#ffc21a]">9,876.54 <span className="text-[12px]">ETH</span></p>
                            </div>
                            <Coins size={38} className="text-[#ffc21a]" />
                        </DashboardCard>
                        <DashboardCard>
                            <div>
                                <p className="text-[11px] text-white/65">Next Claim In</p>
                                <p className="mt-1 text-[19px] font-medium text-white/90">
                                    {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
                                </p>
                            </div>
                            <Hourglass size={37} className="text-[#ffc21a]" />
                        </DashboardCard>
                        <DashboardCard>
                            <div>
                                <p className="text-[11px] text-white/65">Total Claims</p>
                                <p className="mt-1 text-[23px] font-semibold text-[#ffc21a]">19,782</p>
                            </div>
                            <TrendingUp size={40} className="text-[#ffc21a]" />
                        </DashboardCard>
                    </section>
                </div>
            </div>
        </main>
    );
}

function DashboardCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-[84px] items-center justify-between rounded-[15px] border border-white/[0.12] bg-[#0b0b0b]/90 px-4 py-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            {children}
        </div>
    );
}