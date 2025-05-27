import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { setWalletAddress, setEmailAuth } from '../store/slices/authSlice';
import { auth, db } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const handleConnectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      if (isConnecting) {
        return;
      }
      
      setIsConnecting(true);
      try {
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        });
        
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts'
        });
        dispatch(setWalletAddress(accounts[0]));
        navigate('/home');
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

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch(setEmailAuth({
        email: user.email!,
        username: user.displayName || '',
        uid: user.uid
      }));
      navigate('/home');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      
      await updateProfile(user, {
        displayName: username
      });

      await setDoc(doc(db, 'users', user.uid), {
        username,
        email: user.email,
        createdAt: serverTimestamp()
      });

      dispatch(setEmailAuth({
        email: user.email!,
        username,
        uid: user.uid
      }));
      navigate('/home');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 min-w-full min-h-full w-auto h-auto object-cover z-0"
        style={{ filter: 'brightness(0.8)' }}
      >
        <source
          src="https://player.vimeo.com/external/314181352.sd.mp4?s=9f9bf58edae1c3fcbcd60b84daa30b6cafd6e7cd&profile_id=164&oauth2_token_id=57447761"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

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
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <div>
            <input
              type="text"
              placeholder="Email or Username"
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
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/50 border-2 border-orange-300 rounded-lg px-4 py-2 text-orange-600 placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
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