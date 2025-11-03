import React, { useState } from 'react';
import type { User } from '../types';
import UserIcon from './icons/UserIcon';
import MailIcon from './icons/MailIcon';
import MapPinIcon from './icons/MapPinIcon';
import LockClosedIcon from './icons/LockClosedIcon';
import PhoneIcon from './icons/PhoneIcon';

interface RegisterPageProps {
  onRegister: (newUser: Omit<User, 'id'>) => void;
  onNavigateToLogin: () => void;
  onClose: () => void;
}

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

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister, onNavigateToLogin, onClose }) => {
  const [error, setError] = useState('');

  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerAddress, setRegisterAddress] = useState('');
  const [registerState, setRegisterState] = useState('');
  const [registerCountry, setRegisterCountry] = useState('');
  const [registerPinCode, setRegisterPinCode] = useState('');
  const [registerPhoneNumber, setRegisterPhoneNumber] = useState('');
  
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (registerPassword !== registerConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (registerPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    onRegister({
      name: registerName,
      email: registerEmail,
      address: registerAddress,
      state: registerState,
      country: registerCountry,
      pinCode: registerPinCode,
      phoneNumber: registerPhoneNumber,
    });
  };
  

  return (
    <div className="min-h-screen flex justify-center items-center p-4 animate-fadeIn bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-md relative p-8">
        <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10" aria-label="Close">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-2">Create an Account</h2>
            <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Get started with your new account.</p>
            <InputField icon={<UserIcon className="w-5 h-5 text-gray-400" />} type="text" placeholder="Full Name" value={registerName} onChange={(e) => setRegisterName(e.target.value)} autoFocus autoComplete="name" />
            <InputField icon={<MailIcon className="w-5 h-5 text-gray-400" />} type="email" placeholder="Email Address" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} autoComplete="email" />
            <InputField icon={<LockClosedIcon className="w-5 h-5 text-gray-400" />} type="password" placeholder="Password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} autoComplete="new-password" />
            <InputField icon={<LockClosedIcon className="w-5 h-5 text-gray-400" />} type="password" placeholder="Retype Password" value={registerConfirmPassword} onChange={(e) => setRegisterConfirmPassword(e.target.value)} autoComplete="new-password" />
            <InputField icon={<MapPinIcon className="w-5 h-5 text-gray-400" />} type="text" placeholder="Delivery Address" value={registerAddress} onChange={(e) => setRegisterAddress(e.target.value)} autoComplete="street-address" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField icon={<MapPinIcon className="w-5 h-5 text-gray-400" />} type="text" placeholder="State" value={registerState} onChange={(e) => setRegisterState(e.target.value)} autoComplete="address-level1" />
              <InputField icon={<MapPinIcon className="w-5 h-5 text-gray-400" />} type="text" placeholder="Country" value={registerCountry} onChange={(e) => setRegisterCountry(e.target.value)} autoComplete="country-name" />
            </div>
            <InputField icon={<MapPinIcon className="w-5 h-5 text-gray-400" />} type="text" placeholder="Pin Code" value={registerPinCode} onChange={(e) => setRegisterPinCode(e.target.value)} autoComplete="postal-code" />
            <InputField icon={<PhoneIcon className="w-5 h-5 text-gray-400" />} type="tel" placeholder="Phone Number" value={registerPhoneNumber} onChange={(e) => setRegisterPhoneNumber(e.target.value)} autoComplete="tel" />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-orange-400/50 transform hover:-translate-y-0.5">
                Register
            </button>
        </form>
         <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Already have an account?{' '}
            <button onClick={onNavigateToLogin} className="font-semibold text-orange-600 dark:text-orange-400 hover:underline">
                Log In
            </button>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;