import Navbar from '../components/Navbar';
import FaucetButton from '../components/FaucetButton';

export default function DashboardPage() {
  return (
    <main style={{ padding: '20px' }}>
      <Navbar />
      <h1>Token Faucet Dashboard</h1>
      <p>Connect your wallet to claim your test tokens.</p>
      <FaucetButton />
    </main>
  );
}