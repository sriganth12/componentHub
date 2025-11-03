import React, { useState, useEffect, useRef } from 'react';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import ThemeSwitcher from './ThemeSwitcher';
import ReceiptIcon from './icons/ReceiptIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import UndoIcon from './icons/UndoIcon';
import type { User, WarrantyClaim, ReturnRequest, Order, OrderStatus } from '../types';

interface HeaderProps {
  cartItemCount: number;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isScrolled: boolean;
  onLogoClick: () => void;
  onCartClick: () => void;
  onOrdersClick: () => void;
  onProfileClick: () => void;
  onLoginClick: () => void;
  currentUser: User | null;
  placedOrders: Order[];
  warrantyClaims: WarrantyClaim[];
  returnRequests: ReturnRequest[];
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, theme, toggleTheme, isScrolled, onLogoClick, onCartClick, onOrdersClick, onProfileClick, onLoginClick, currentUser, placedOrders, warrantyClaims, returnRequests }) => {
  const [isOrdersDropdownOpen, setIsOrdersDropdownOpen] = useState(false);
  const [isWarrantyDropdownOpen, setIsWarrantyDropdownOpen] = useState(false);
  const [isReturnDropdownOpen, setIsReturnDropdownOpen] = useState(false);

  const ordersDropdownRef = useRef<HTMLDivElement>(null);
  const warrantyDropdownRef = useRef<HTMLDivElement>(null);
  const returnDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ordersDropdownRef.current && !ordersDropdownRef.current.contains(event.target as Node)) {
        setIsOrdersDropdownOpen(false);
      }
      if (warrantyDropdownRef.current && !warrantyDropdownRef.current.contains(event.target as Node)) {
        setIsWarrantyDropdownOpen(false);
      }
      if (returnDropdownRef.current && !returnDropdownRef.current.contains(event.target as Node)) {
        setIsReturnDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const StatusIndicator = ({ status }: { status: string }) => {
    const statusStyles: { [key: string]: string } = {
        Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        Approved: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        Shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
        Received: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    };
    return (
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${statusStyles[status] || ''}`}>
            {status}
        </span>
    );
  };

  const OrderStatusIndicator = ({ status }: { status: OrderStatus }) => {
    const statusStyles: { [key in OrderStatus]: string } = {
        Processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        Shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
        'Out for Delivery': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        Delivered: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    };
    return (
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
            {status}
        </span>
    );
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50' 
        : 'bg-transparent'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button onClick={onLogoClick} className="focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md -ml-2 p-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
              Component<span className="text-orange-600">Hub</span>
            </h1>
          </button>
          <div className="flex items-center space-x-1 sm:space-x-2">
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
              <>
                <div className="relative" ref={ordersDropdownRef}>
                    <button
                        onClick={() => { setIsOrdersDropdownOpen(prev => !prev); setIsWarrantyDropdownOpen(false); setIsReturnDropdownOpen(false); }}
                        className="p-2 rounded-full hover:bg-gray-200/60 dark:hover:bg-gray-700/60 transition-colors"
                        aria-label="View recent orders"
                    >
                        <ReceiptIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    {isOrdersDropdownOpen && (
                        <div className="absolute right-0 mt-3 w-80 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 animate-slideDown">
                            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Recent Orders</h3>
                            </div>
                            <div className="py-2">
                                {placedOrders.length > 0 ? (
                                    <div className="max-h-48 overflow-y-auto">
                                        {placedOrders.slice(0, 3).map(order => (
                                            <div key={order.id} className="px-4 py-2 flex justify-between items-center text-sm">
                                                <span className="text-gray-700 dark:text-gray-200 truncate pr-2">Order #{order.id.slice(-6)}</span>
                                                <OrderStatusIndicator status={order.status} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">No recent orders.</p>
                                )}
                            </div>
                            <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                                <button
                                    onClick={() => { onOrdersClick(); setIsOrdersDropdownOpen(false); }}
                                    className="w-full text-center px-4 py-2 text-sm font-semibold text-orange-600 dark:text-orange-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                                >
                                    View All Orders & Activity
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative" ref={warrantyDropdownRef}>
                    <button
                        onClick={() => { setIsWarrantyDropdownOpen(prev => !prev); setIsOrdersDropdownOpen(false); setIsReturnDropdownOpen(false); }}
                        className="p-2 rounded-full hover:bg-gray-200/60 dark:hover:bg-gray-700/60 transition-colors"
                        aria-label="View warranty claims"
                    >
                        <ShieldCheckIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    {isWarrantyDropdownOpen && (
                        <div className="absolute right-0 mt-3 w-80 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 animate-slideDown">
                            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Warranty Claims</h3>
                            </div>
                            <div className="py-2">
                                {warrantyClaims.length > 0 ? (
                                    <div className="max-h-48 overflow-y-auto">
                                        {warrantyClaims.slice(0, 3).map(claim => (
                                            <div key={claim.id} className="px-4 py-2 flex justify-between items-center text-sm">
                                                <span className="text-gray-700 dark:text-gray-200 truncate pr-2">{claim.item.name}</span>
                                                <StatusIndicator status={claim.status} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">No active claims.</p>
                                )}
                            </div>
                            <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                                <button
                                    onClick={() => { onOrdersClick(); setIsWarrantyDropdownOpen(false); }}
                                    className="w-full text-center px-4 py-2 text-sm font-semibold text-orange-600 dark:text-orange-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                                >
                                    View All Activity
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative" ref={returnDropdownRef}>
                    <button
                        onClick={() => { setIsReturnDropdownOpen(prev => !prev); setIsOrdersDropdownOpen(false); setIsWarrantyDropdownOpen(false); }}
                        className="p-2 rounded-full hover:bg-gray-200/60 dark:hover:bg-gray-700/60 transition-colors"
                        aria-label="View return requests"
                    >
                        <UndoIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    {isReturnDropdownOpen && (
                        <div className="absolute right-0 mt-3 w-80 origin-top-right bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 animate-slideDown">
                            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Return Requests</h3>
                            </div>
                            <div className="py-2">
                                {returnRequests.length > 0 ? (
                                    <div className="max-h-48 overflow-y-auto">
                                        {returnRequests.slice(0, 3).map(request => (
                                            <div key={request.id} className="px-4 py-2 flex justify-between items-center text-sm">
                                                <span className="text-gray-700 dark:text-gray-200 truncate pr-2">{request.item.name}</span>
                                                <StatusIndicator status={request.status} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">No active returns.</p>
                                )}
                            </div>
                            <div className="p-2 border-t border-gray-100 dark:border-gray-700">
                                <button
                                    onClick={() => { onOrdersClick(); setIsReturnDropdownOpen(false); }}
                                    className="w-full text-center px-4 py-2 text-sm font-semibold text-orange-600 dark:text-orange-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                                >
                                    View All Activity
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <button
                  onClick={onProfileClick}
                  className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center font-bold text-orange-600 dark:text-orange-400 ring-2 ring-transparent hover:ring-orange-400 transition-all"
                  aria-label="Go to My Profile"
                >
                  {currentUser.name[0].toUpperCase()}
                </button>
              </>
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