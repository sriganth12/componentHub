import React, { useState, useEffect, useRef } from 'react';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import ThemeSwitcher from './ThemeSwitcher';
import ReceiptIcon from './icons/ReceiptIcon';
import UserIcon from './icons/UserIcon';
import LogoutIcon from './icons/LogoutIcon';
import type { User } from '../types';

interface HeaderProps {
  cartItemCount: number;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isScrolled: boolean;
  onLogoClick: () => void;
  onCartClick: () => void;
  onOrdersClick: () => void;
  onProfileClick: () => void;
  onLogout: () => void;
  onLoginClick: () => void;
  currentUser: User | null;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, theme, toggleTheme, isScrolled, onLogoClick, onCartClick, onOrdersClick, onProfileClick, onLogout, onLoginClick, currentUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button onClick={onLogoClick} className="focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md -ml-2 p-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
              Component<span className="text-orange-600">Hub</span>
            </h1>
          </button>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full hover:bg-gray-200/60 dark:hover:bg-gray-700/60 transition-colors"
              aria-label="Open cart"
            >
                <ShoppingCartIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                {cartItemCount > 0 && (
                    <span 
                        key={cartItemCount} 
                        className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center animate-pop"
                    >
                        {cartItemCount}
                    </span>
                )}
            </button>
            {currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(prev => !prev)}
                  className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center font-bold text-orange-600 dark:text-orange-400 ring-2 ring-transparent hover:ring-orange-400 transition-all"
                  aria-label="Open user menu"
                >
                  {currentUser.name[0].toUpperCase()}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 ring-1 ring-black ring-opacity-5 animate-slideDown">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{currentUser.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{currentUser.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => { onProfileClick(); setIsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                      >
                        <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        My Profile
                      </button>
                      <button
                        onClick={() => { onOrdersClick(); setIsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                      >
                        <ReceiptIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        My Orders
                      </button>
                    </div>
                    <div className="py-1 border-t border-gray-100 dark:border-gray-700">
                      <button
                        onClick={() => { onLogout(); setIsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                      >
                        <LogoutIcon className="w-5 h-5" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-md hover:shadow-orange-400/50 transform hover:-translate-y-0.5"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;