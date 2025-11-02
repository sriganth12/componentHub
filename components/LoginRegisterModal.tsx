import React, { useState } from 'react';
import type { User } from '../types';
import UserIcon from './icons/UserIcon';
import MailIcon from './icons/MailIcon';
import MapPinIcon from './icons/MapPinIcon';
import LockClosedIcon from './icons/LockClosedIcon';
import XIcon from './icons/XIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface LoginRegisterModalProps {
  onRegister: (newUser: Omit<User, 'id'>) => void;
  onLogin: (credentials: { email: string, password: string }) => boolean;
  onClose: () => void;
}

type View = 'login' | 'register' | 'forgotPassword' | 'forgotConfirmation';

const InputField = ({ icon, ...props }: { icon: React.ReactNode, [key: string]: any }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      {...props}
      className="w-full pl-10 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      required
    />
  </div>
);

const LoginRegisterModal: React.FC<LoginRegisterModalProps> = ({ onRegister, onLogin, onClose }) => {
  const [view, setView] = useState<View>('login');
  const [error, setError] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerAddress, setRegisterAddress] = useState('');
  
  const [forgotEmail, setForgotEmail] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin({ email: loginEmail, password: loginPassword });
    if (!success) {
      setError('Invalid email or password. Please try again.');
    }
  };
  
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    onRegister({
      name: registerName,
      email: registerEmail,
      address: registerAddress,
    });
  };
  
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // In a real app, you would call an API to send a reset link.
    // For this demo, we'll just switch to the confirmation view.
    console.log(`Password reset requested for ${forgotEmail}`);
    setView('forgotConfirmation');
  };
  
  const renderContent = () => {
      switch (view) {
        case 'register':
            return (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-2">Create an Account</h2>
                    <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Get started with your new account.</p>
                    <InputField icon={<UserIcon className="w-5 h-5 text-gray-400" />} type="text" placeholder="Full Name" value={registerName} onChange={(e) => setRegisterName(e.target.value)} autoFocus />
                    <InputField icon={<MailIcon className="w-5 h-5 text-gray-400" />} type="email" placeholder="Email Address" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
                    <InputField icon={<LockClosedIcon className="w-5 h-5 text-gray-400" />} type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
                    <InputField icon={<MapPinIcon className="w-5 h-5 text-gray-400" />} type="text" placeholder="Delivery Address" value={registerAddress} onChange={(e) => setRegisterAddress(e.target.value)} />
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-orange-400/50 transform hover:-translate-y-0.5">
                        Register
                    </button>
                </form>
            );
        case 'forgotPassword':
            return (
                 <form onSubmit={handleForgotSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-2">Reset Password</h2>
                    <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Enter your email and we'll send you instructions to reset your password.</p>
                    <InputField icon={<MailIcon className="w-5 h-5 text-gray-400" />} type="email" placeholder="Email Address" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} autoFocus />
                    <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-orange-400/50 transform hover:-translate-y-0.5">
                        Send Reset Link
                    </button>
                     <button type="button" onClick={() => setView('login')} className="w-full text-center text-sm text-orange-600 dark:text-orange-400 hover:underline">
                        Back to Login
                    </button>
                </form>
            );
        case 'forgotConfirmation':
            return (
                <div className="text-center">
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-4">Check Your Email</h2>
                    <p className="text-center text-gray-500 dark:text-gray-400 mt-2">We've sent a password reset link to <span className="font-semibold">{forgotEmail}</span>.</p>
                    <button onClick={() => setView('login')} className="mt-6 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-orange-400/50 transform hover:-translate-y-0.5">
                        Back to Login
                    </button>
                </div>
            );
        case 'login':
        default:
            return (
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-2">Welcome Back!</h2>
                  <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Sign in to continue to Component Hub.</p>
                  <InputField icon={<MailIcon className="w-5 h-5 text-gray-400" />} type="email" placeholder="Email Address" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} autoFocus />
                  <div>
                    <InputField icon={<LockClosedIcon className="w-5 h-5 text-gray-400" />} type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                    <button type="button" onClick={() => setView('forgotPassword')} className="text-xs text-orange-600 dark:text-orange-400 hover:underline mt-1 text-right w-full">
                        Forgot Password?
                    </button>
                  </div>
                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-orange-400/50 transform hover:-translate-y-0.5">
                    Login
                  </button>
                </form>
            );
      }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md animate-scaleIn relative">
        <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10">
            <XIcon className="w-5 h-5" />
        </button>
        {view !== 'forgotConfirmation' && (
            <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
                onClick={() => { setView('login'); setError(''); }}
                className={`w-1/2 p-4 font-semibold text-center transition-colors ${view === 'login' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 dark:text-gray-400'}`}
            >
                Login
            </button>
            <button
                onClick={() => { setView('register'); setError(''); }}
                className={`w-1/2 p-4 font-semibold text-center transition-colors ${view === 'register' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 dark:text-gray-400'}`}
            >
                Register
            </button>
            </div>
        )}
        <div className="p-8">
            {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterModal;