'use client';

import { useEffect, useState } from 'react';
import {
    ArrowRight,
    ChevronDown,
    Copy,
    Coins,
    Clock3,
    Hourglass,
    TrendingUp,
    Wallet,
    Check,
} from 'lucide-react';

const recentClaims = [
    {
        wallet: '0x32f...91a2',
        time: '1 min ago',
        amount: '50 ETH',
    },
    {
        wallet: '0x71c...a8d9',
        time: '5 min ago',
        amount: '50 ETH',
    },
    {
        wallet: '0x5bd...e3f1',
        time: '11 min ago',
        amount: '50 ETH',
    },
];

const networks = [
    {
        id: 'avalanche-fuji',
        name: 'Avalanche Fuji',
        logo: '🔺',
    },
    {
        id: 'ethereum-sepolia',
        name: 'Ethereum Sepolia',
        logo: '♦️',
    },
    {
        id: 'polygon-amoy',
        name: 'Polygon Amoy',
        logo: '⬡',
    },
    {
        id: 'sonic-blaze',
        name: 'Sonic Blaze',
        logo: 'S',
    },
    {
        id: 'optimism-sepolia',
        name: 'Optimism Sepolia',
        logo: '🔴',
    },
    {
        id: 'base-sepolia',
        name: 'Base Sepolia',
        logo: '🔵',
    },
];

export default function TokenFaucet() {
    const [amount, setAmount] = useState('50');
    const [walletAddress, setWalletAddress] = useState('');
    const [copied, setCopied] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        minutes: 45,
        seconds: 12,
    });
    const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
    const [networkOpen, setNetworkOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (
                    prev.hours === 0 &&
                    prev.minutes === 0 &&
                    prev.seconds === 0
                ) {
                    return {
                        hours: 23,
                        minutes: 59,
                        seconds: 59,
                    };
                }

                if (prev.seconds > 0) {
                    return {
                        ...prev,
                        seconds: prev.seconds - 1,
                    };
                }

                if (prev.minutes > 0) {
                    return {
                        hours: prev.hours,
                        minutes: prev.minutes - 1,
                        seconds: 59,
                    };
                }

                return {
                    hours: prev.hours - 1,
                    minutes: 59,
                    seconds: 59,
                };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const copyWallet = async () => {
        if (walletAddress) {
            await navigator.clipboard.writeText(walletAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    const handleClaim = () => {
        console.log(`Claiming ${amount} ETH for address: ${walletAddress}`);
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#080808] text-white">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-yellow-500/[0.025] blur-[150px]" />
                <div className="absolute right-[-150px] top-[-100px] h-[500px] w-[500px] rounded-full bg-yellow-500/[0.02] blur-[150px]" />
            </div>

            <div className="pointer-events-none absolute inset-0 opacity-20">
                <div className="absolute left-[48%] top-[-10%] h-[800px] w-px rotate-[38deg] bg-gradient-to-b from-transparent via-yellow-600/40 to-transparent" />
                <div className="absolute left-[55%] top-[50%] h-[600px] w-px rotate-[38deg] bg-gradient-to-b from-transparent via-yellow-600/20 to-transparent" />
            </div>

            <div className="relative mx-auto flex min-h-screen w-full max-w-[1180px] items-center justify-center px-5 py-10 lg:px-8">
                <div className="grid w-full max-w-[940px] grid-cols-1 gap-7 lg:grid-cols-[1fr_1fr]">
                    <section className="rounded-[18px] border border-white/[0.12] bg-[#0b0b0b]/90 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-7">
                        <div className="mb-7">
                            <h1 className="text-[27px] font-semibold tracking-[-0.8px] text-[#ffc21a] sm:text-[30px]">
                                Claim Test Tokens
                            </h1>
                            <p className="mt-1.5 text-[13px] text-white/50">
                                Secure. Fast. Built for Developers.
                            </p>
                        </div>

                        <div className="relative mb-5">
                            <button
                                type="button"
                                onClick={() => setNetworkOpen((prev) => !prev)}
                                className="flex h-[38px] w-full items-center justify-between rounded-lg border border-yellow-600/40 bg-[#101010] px-3.5 text-sm transition hover:border-yellow-500/70"
                            >
                                <span className="flex items-center gap-2.5">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2b2d66] text-[10px] font-semibold text-white">
                                        {selectedNetwork.logo}
                                    </span>
                                    <span className="text-white/85">
                                        {selectedNetwork.name}
                                    </span>
                                </span>
                                <ChevronDown
                                    size={16}
                                    className={`text-white/50 transition-transform duration-200 ${networkOpen ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {networkOpen && (
                                <div className="absolute left-0 right-0 top-[45px] z-50 overflow-hidden rounded-lg border border-yellow-600/30 bg-[#111111] p-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                                    {networks.map((network) => {
                                        const isSelected = selectedNetwork.id === network.id;
                                        return (
                                            <button
                                                key={network.id}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedNetwork(network);
                                                    setNetworkOpen(false);
                                                }}
                                                className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition ${isSelected ? 'bg-yellow-500/10 text-[#ffc21a]' : 'text-white/75 hover:bg-white/[0.05] hover:text-white'}`}
                                            >
                                                <span className="flex items-center gap-2.5">
                                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2b2d66] text-[10px] font-semibold text-white">
                                                        {network.logo}
                                                    </span>
                                                    <span>{network.name}</span>
                                                </span>
                                                {isSelected && <Check size={15} className="text-[#ffc21a]" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="mb-5">
                            <div className="flex h-[38px] items-center rounded-lg border border-yellow-600/40 bg-[#101010] px-3.5">
                                <input
                                    type="text"
                                    value={walletAddress}
                                    onChange={(e) => setWalletAddress(e.target.value)}
                                    placeholder="Enter your wallet address"
                                    className="min-w-0 flex-1 bg-transparent text-sm text-white/85 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={copyWallet}
                                    className="ml-2 text-white/50 transition hover:text-[#ffc21a]"
                                    title="Copy wallet address"
                                >
                                    <Copy size={15} />
                                </button>
                            </div>
                            {copied && <p className="mt-1.5 text-[10px] text-[#ffc21a]">Address copied</p>}
                        </div>

                        <div className="mb-6">
                            <div className="flex h-[38px] items-center rounded-lg border border-yellow-600/40 bg-[#101010] px-3.5">
                                <input
                                    type="number"
                                    min="1"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none"
                                />
                                <span className="text-xs text-white/60">ETH</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleClaim}
                            className="group flex h-[45px] w-full items-center justify-center gap-3 rounded-lg bg-[#ffbd08] text-sm font-semibold text-[#181000] shadow-[0_0_25px_rgba(255,189,8,0.12)] transition hover:bg-[#ffca2c] hover:shadow-[0_0_30px_rgba(255,189,8,0.2)] active:scale-[0.99]"
                        >
                            <span>Claim Tokens</span>
                            <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </section>

                    <section className="flex flex-col gap-3">
                        <DashboardCard>
                            <div>
                                <p className="text-[11px] text-white/65">Faucet Balance</p>
                                <p className="mt-1 text-[23px] font-semibold tracking-tight text-[#ffc21a]">
                                    9,876.54 <span className="text-[12px] font-medium">ETH</span>
                                </p>
                            </div>
                            <Coins size={38} strokeWidth={1.4} className="text-[#ffc21a]" />
                        </DashboardCard>

                        <DashboardCard>
                            <div>
                                <p className="text-[11px] text-white/65">Next Claim In</p>
                                <p className="mt-1 text-[19px] font-medium tracking-wide text-white/90">
                                    {String(timeLeft.hours).padStart(2, '0')}h :{' '}
                                    {String(timeLeft.minutes).padStart(2, '0')}m :{' '}
                                    {String(timeLeft.seconds).padStart(2, '0')}s
                                </p>
                            </div>
                            <Hourglass size={37} strokeWidth={1.4} className="text-[#ffc21a]" />
                        </DashboardCard>

                        <DashboardCard>
                            <div>
                                <p className="text-[11px] text-white/65">Total Claims</p>
                                <p className="mt-1 text-[23px] font-semibold tracking-tight text-[#ffc21a]">
                                    19,782
                                </p>
                            </div>
                            <TrendingUp size={40} strokeWidth={1.7} className="text-[#ffc21a]" />
                        </DashboardCard>

                        <div className="rounded-[15px] border border-white/[0.12] bg-[#0b0b0b]/90 px-4 py-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-[11px] font-medium text-white/80">Recent Claims</h2>
                            </div>
                            <div className="space-y-3">
                                {recentClaims.map((claim) => (
                                    <div key={claim.wallet} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 text-[10px]">
                                        <span className="font-medium text-white/75">{claim.wallet}</span>
                                        <span className="text-white/35">{claim.time}</span>
                                        <span className="text-[#ffc21a]">{claim.amount}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

function DashboardCard({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-[84px] items-center justify-between rounded-[15px] border border-white/[0.12] bg-[#0b0b0b]/90 px-4 py-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:border-yellow-600/30">
            {children}
        </div>
    );
}