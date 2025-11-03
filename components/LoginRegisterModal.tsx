import React, { useState } from 'react';
import MailIcon from './icons/MailIcon';
import LockClosedIcon from './icons/LockClosedIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface LoginPageProps {
  onLogin: (credentials: { email: string, password: string }) => boolean;
  onNavigateToRegister: () => void;
  onClose: () => void;
}

type View = 'login' | 'forgotPassword' | 'forgotConfirmation';

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

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateToRegister, onClose }) => {
  const [view, setView] = useState<View>('login');
  const [error, setError] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [forgotEmail, setForgotEmail] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin({ email: loginEmail, password: loginPassword });
    if (!success) {
      setError('Invalid email or password. Please try again.');
    }
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
    <div className="min-h-screen flex justify-center items-center p-4 animate-fadeIn bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md relative p-8">
        <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {renderContent()}

        {view === 'login' && (
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                Don't have an account?{' '}
                <button onClick={onNavigateToRegister} className="font-semibold text-orange-600 dark:text-orange-400 hover:underline">
                    Sign Up
                </button>
            </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;