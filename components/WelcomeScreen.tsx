import React from 'react';

interface WelcomeScreenProps {
  onLoginClick: () => void;
  onGuestClick: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLoginClick, onGuestClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-100/60 dark:from-gray-900 dark:to-orange-900/10 flex flex-col items-center justify-center p-4 font-sans text-gray-800 dark:text-gray-200">
      <div className="w-full max-w-4xl mx-auto text-center animate-fadeIn">
        
        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-2xl rounded-2xl p-8 sm:p-12 border border-white/50 dark:border-gray-700/50">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
                Welcome to Component Hub
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your one-stop shop for high-quality mobile device components.
            </p>

            <div className="mt-8 text-left max-w-2xl mx-auto bg-gray-50/50 dark:bg-gray-700/30 p-6 rounded-lg border dark:border-gray-200/50 dark:border-gray-700/50">
                <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">About Us</h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Component Hub is dedicated to providing reliable, top-tier parts for all your mobile repair needs. From screens and batteries to cameras and charging ports, we partner with leading brands to ensure you get the best components for your devices.
                </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
                onClick={onLoginClick}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-8 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-orange-400/50 transform hover:-translate-y-0.5"
            >
                Login / Register
            </button>
            <button
                onClick={onGuestClick}
                className="w-full sm:w-auto bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
                Continue as Guest
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
