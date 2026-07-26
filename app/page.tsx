import Navbar from "@/components/Navbar";
import { FaucetButton } from "@/components/FaucetButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8">
          Web3 Token Faucet
        </h1>
        
        <FaucetButton />
      </div>
    </main>
  );
}