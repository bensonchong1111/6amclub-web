import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { setWalletAddress, setEmailAuth } from '../store/slices/authSlice';

const LandingPage = () => {
  const dispatch = useDispatch();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleConnectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        dispatch(setWalletAddress(accounts[0]));
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setEmailAuth(email));
    setIsLoginModalOpen(false);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement sign up logic here
    setIsSignUpModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 morning-gradient">
      <h1 className="text-6xl font-bold mb-12 text-orange-600">6AM CLUB</h1>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => setIsLoginModalOpen(true)}>
          Login with Email
        </Button>
        <Button
          variant="secondary"
          onClick={handleConnectWallet}
        >
          Connect Wallet
        </Button>
      </div>

      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Login</h2>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-orange-50 border-2 border-orange-400 rounded-lg px-4 py-2 text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-orange-50 border-2 border-orange-400 rounded-lg px-4 py-2 text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <Button onClick={() => {}} className="w-full">
            Login
          </Button>
          <p className="text-center text-orange-600 mt-4">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => {
                setIsLoginModalOpen(false);
                setIsSignUpModalOpen(true);
              }}
              className="text-orange-500 hover:underline"
            >
              Sign up here
            </button>
          </p>
        </form>
      </Modal>

      <Modal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
      >
        <form onSubmit={handleSignUp} className="space-y-4">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Sign Up</h2>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-orange-50 border-2 border-orange-400 rounded-lg px-4 py-2 text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-orange-50 border-2 border-orange-400 rounded-lg px-4 py-2 text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <Button onClick={() => {}} className="w-full">
            Sign Up
          </Button>
          <p className="text-center text-orange-600 mt-4">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => {
                setIsSignUpModalOpen(false);
                setIsLoginModalOpen(true);
              }}
              className="text-orange-500 hover:underline"
            >
              Login here
            </button>
          </p>
        </form>
      </Modal>
    </div>
  );
};

export default LandingPage;