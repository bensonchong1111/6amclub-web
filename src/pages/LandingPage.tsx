import React, { useState } from 'react';
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
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      if (isConnecting) return;
      
      setIsConnecting(true);
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        dispatch(setWalletAddress(accounts[0]));
      } catch (error) {
        if (error.message.includes('User rejected the request')) {
          alert('Wallet connection rejected by user.');
        } else {
          console.error('Error connecting wallet:', error);
          alert('Failed to connect wallet. Please try again.');
        }
      } finally {
        setIsConnecting(false);
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
    setIsSignUpModalOpen(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://player.vimeo.com/external/534342299.sd.mp4?s=f0fb41d0bd4e87d43aef4b9c1a4e2d6063f4edb5&profile_id=164&oauth2_token_id=57447761"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        <div className="sunrise backdrop-blur-sm bg-white/30 p-8 rounded-2xl">
          <h1 className="text-7xl font-bold mb-4 text-orange-600">6AM CLUB</h1>
          <p className="text-xl text-orange-700 mb-12">Start your day with purpose</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => setIsLoginModalOpen(true)}>
              Login with Email
            </Button>
            <Button
              variant="secondary"
              onClick={handleConnectWallet}
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Welcome Back</h2>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/50 border-2 border-orange-300 rounded-lg px-4 py-2 text-orange-600 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/50 border-2 border-orange-300 rounded-lg px-4 py-2 text-orange-600 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
          <h2 className="text-2xl font-bold text-orange-600 mb-6">Join the Club</h2>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/50 border-2 border-orange-300 rounded-lg px-4 py-2 text-orange-600 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/50 border-2 border-orange-300 rounded-lg px-4 py-2 text-orange-600 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
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