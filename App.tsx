import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Brand, ComponentItem, CartItem, Order, User, OrderStatus, DeliveryOption, WarrantyClaim, ReturnRequest, WarrantyClaimStatus, ReturnRequestStatus, Review } from './types';
import { BRANDS_DATA, DELIVERY_OPTIONS, ORDER_STATUS_PROGRESSION, WARRANTY_STATUS_PROGRESSION, RETURN_STATUS_PROGRESSION } from './constants';
import Header from './components/Header';
import BrandCard from './components/RestaurantCard';
import BrandComponentsModal from './components/RestaurantMenuModal';
import Cart from './components/Cart';
import PaymentModal from './components/PaymentModal';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import PlacedOrdersModal from './components/PlacedOrdersModal';
import LoginRegisterModal from './components/LoginRegisterModal';
import ProfileModal from './components/ProfileModal';
import PaymentMethodModal from './components/PaymentMethodModal';
import WelcomeScreen from './components/WelcomeScreen';
import ReviewModal from './components/ReviewModal';

type View = 'brands' | 'cart';
type AuthStatus = 'unauthenticated' | 'guest' | 'authenticated';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [placedOrders, setPlacedOrders] = useState<Order[]>([]);
  const [view, setView] = useState<View>('brands');
  
  const [authStatus, setAuthStatus] = useState<AuthStatus>('unauthenticated');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginRedirect, setLoginRedirect] = useState<(() => void) | null>(null);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [pendingDeliveryOption, setPendingDeliveryOption] = useState<DeliveryOption | null>(null);

  const [warrantyClaims, setWarrantyClaims] = useState<WarrantyClaim[]>([]);
  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>([]);
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [itemToReview, setItemToReview] = useState<ComponentItem | null>(null);


  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Simulate order status progression
  useEffect(() => {
    if (authStatus !== 'authenticated') return;
    const interval = setInterval(() => {
        setPlacedOrders(prevOrders => {
            return prevOrders.map(order => {
                if (order.status === 'Delivered' || order.status === 'Cancelled') {
                    return order;
                }
                const currentStatusIndex = ORDER_STATUS_PROGRESSION.indexOf(order.status);
                if (currentStatusIndex < ORDER_STATUS_PROGRESSION.length - 1) {
                    const nextStatus = ORDER_STATUS_PROGRESSION[currentStatusIndex + 1];
                    const isDelivered = nextStatus === 'Delivered';
                    return { 
                        ...order, 
                        status: nextStatus,
                        ...(isDelivered && { deliveryDate: new Date().toISOString() })
                    };
                }
                return order;
            });
        });
    }, 8000); // Update every 8 seconds for demonstration

    return () => clearInterval(interval);
  }, [authStatus]);
  
  // Simulate warranty claim progression
  useEffect(() => {
    if (authStatus !== 'authenticated') return;
    const interval = setInterval(() => {
        setWarrantyClaims(prevClaims => {
            return prevClaims.map(claim => {
                if (claim.status === 'Shipped' || claim.status === 'Rejected') {
                    return claim;
                }
                const currentStatusIndex = WARRANTY_STATUS_PROGRESSION.indexOf(claim.status);
                if (currentStatusIndex < WARRANTY_STATUS_PROGRESSION.length - 1) {
                    const nextStatus = WARRANTY_STATUS_PROGRESSION[currentStatusIndex + 1];
                    return { ...claim, status: nextStatus };
                }
                return claim;
            });
        });
    }, 10000); // Update every 10 seconds for demonstration

    return () => clearInterval(interval);
  }, [authStatus]);

  // Simulate return request progression
  useEffect(() => {
    if (authStatus !== 'authenticated') return;
    const interval = setInterval(() => {
        setReturnRequests(prevRequests => {
            return prevRequests.map(request => {
                if (request.status === 'Received' || request.status === 'Rejected') {
                    return request;
                }
                const currentStatusIndex = RETURN_STATUS_PROGRESSION.indexOf(request.status);
                if (currentStatusIndex < RETURN_STATUS_PROGRESSION.length - 1) {
                    const nextStatus = RETURN_STATUS_PROGRESSION[currentStatusIndex + 1];
                    return { ...request, status: nextStatus };
                }
                return request;
            });
        });
    }, 12000); // Update every 12 seconds for demonstration

    return () => clearInterval(interval);
  }, [authStatus]);


  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = useCallback((item: ComponentItem, brand: Brand) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1, brandId: brand.id, brandName: brand.name }];
    });
  }, []);
  
  const handleUpdateQuantity = useCallback((itemId: number, newQuantity: number) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item.id !== itemId);
      }
      return prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const handleProceedToPayment = (deliveryOption: DeliveryOption) => {
    setPendingDeliveryOption(deliveryOption);
    setIsPaymentModalOpen(false);
    setIsPaymentMethodModalOpen(true);
  };

  const handleConfirmPayment = () => {
    if (!currentUser || !pendingDeliveryOption) return;
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax + pendingDeliveryOption.cost;

    const newOrder: Order = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      items: cartItems,
      total: total,
      status: 'Processing',
      userId: currentUser.id,
      deliveryOption: pendingDeliveryOption,
    };

    setPlacedOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setPendingDeliveryOption(null);
    setIsPaymentMethodModalOpen(false);
    setIsConfirmationModalOpen(true);
  };
  
  const handleCancelOrder = (orderId: string, reason: string) => {
    setPlacedOrders(prev => prev.map(order => 
      order.id === orderId 
        ? {...order, status: 'Cancelled', cancellationReason: reason} 
        : order
    ));
  };
  
  const handleWarrantySubmit = (item: ComponentItem, orderId: string, description: string) => {
    if (!currentUser) return;
    const newClaim: WarrantyClaim = {
        id: `claim-${Date.now()}`,
        orderId,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        item,
        status: 'Pending',
        description,
        userId: currentUser.id,
    };
    setWarrantyClaims(prev => [newClaim, ...prev]);
  };

  const handleReturnSubmit = (item: ComponentItem, orderId: string, reason: string) => {
      if (!currentUser) return;
      const newRequest: ReturnRequest = {
          id: `return-${Date.now()}`,
          orderId,
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          item,
          status: 'Pending',
          reason,
          userId: currentUser.id,
      };
      setReturnRequests(prev => [newRequest, ...prev]);
  };
  
  const handleReviewSubmit = (componentId: number, rating: number, comment: string) => {
    if (!currentUser) return;
    const newReview: Review = {
        id: `review-${Date.now()}`,
        componentId,
        rating,
        comment,
        userId: currentUser.id,
        userName: currentUser.name,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    };
    setReviews(prev => [newReview, ...prev]);
    setItemToReview(null); // Close modal
  };

  const handleRegister = (newUser: Omit<User, 'id'>) => {
    const userWithId = { ...newUser, id: `user-${Date.now()}`};
    setUsers(prev => [...prev, userWithId]);
    setCurrentUser(userWithId);
    setAuthStatus('authenticated');
    setIsLoginModalOpen(false);
    if (loginRedirect) {
      loginRedirect();
      setLoginRedirect(null);
    }
  };

  const handleLogin = (credentials: {email: string, password: string}) => {
    const user = users.find(u => u.email === credentials.email);
    // In a real app, we'd also check the password here.
    if(user) {
      setCurrentUser(user);
      setAuthStatus('authenticated');
      setIsLoginModalOpen(false);
      if (loginRedirect) {
        loginRedirect();
        setLoginRedirect(null);
      }
      return true;
    }
    return false;
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    setCartItems([]);
    setAuthStatus('unauthenticated');
  };

  const handleUpdateUser = (updatedUser: User) => {
    if (!currentUser) return;
    const newUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
    setUsers(newUsers);
    setCurrentUser(updatedUser);
  };

  const cartItemCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  const orderTotal = useMemo(() => {
    if (!pendingDeliveryOption) return 0;
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    return subtotal + tax + pendingDeliveryOption.cost;
  }, [cartItems, pendingDeliveryOption]);
  
  const renderView = () => {
    switch (view) {
      case 'cart':
        return (
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onClose={() => setView('brands')}
            onCheckout={() => {
              if (cartItems.length > 0) {
                 if (currentUser) {
                  setIsPaymentModalOpen(true);
                } else {
                  setLoginRedirect(() => () => setIsPaymentModalOpen(true));
                  setIsLoginModalOpen(true);
                }
              }
            }}
          />
        );
      case 'brands':
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BRANDS_DATA.map((brand, index) => (
              <BrandCard key={brand.id} brand={brand} onClick={() => setSelectedBrand(brand)} index={index} />
            ))}
          </div>
        );
    }
  };

  if (authStatus === 'unauthenticated') {
    return (
      <>
        <WelcomeScreen onLoginClick={() => setIsLoginModalOpen(true)} onGuestClick={() => setAuthStatus('guest')} />
        {isLoginModalOpen && (
          <LoginRegisterModal 
            onRegister={handleRegister} 
            onLogin={handleLogin} 
            onClose={() => {
              setIsLoginModalOpen(false);
              setLoginRedirect(null);
            }}
          />
        )}
      </>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans transition-colors duration-300">
      <Header 
        cartItemCount={cartItemCount}
        theme={theme}
        toggleTheme={toggleTheme}
        isScrolled={isScrolled}
        onCartClick={() => setView('cart')}
        onOrdersClick={() => setIsOrdersModalOpen(true)}
        onProfileClick={() => setIsProfileModalOpen(true)}
        onLogout={handleLogout}
        onLoginClick={() => setIsLoginModalOpen(true)}
        currentUser={currentUser}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>
      
      {selectedBrand && (
        <BrandComponentsModal
          brand={selectedBrand}
          onClose={() => setSelectedBrand(null)}
          onAddToCart={handleAddToCart}
          reviews={reviews}
        />
      )}
      
      {isPaymentModalOpen && currentUser && (
        <PaymentModal
          user={currentUser}
          cartItems={cartItems}
          onClose={() => setIsPaymentModalOpen(false)}
          onProceedToPayment={handleProceedToPayment}
        />
      )}
      
      {isPaymentMethodModalOpen && (
        <PaymentMethodModal
          totalAmount={orderTotal}
          onClose={() => setIsPaymentMethodModalOpen(false)}
          onConfirmPayment={handleConfirmPayment}
        />
      )}

      {isConfirmationModalOpen && (
        <OrderConfirmationModal onClose={() => setIsConfirmationModalOpen(false)} />
      )}
      
      {isOrdersModalOpen && currentUser && (
        <PlacedOrdersModal 
            orders={placedOrders.filter(o => o.userId === currentUser.id)}
            warrantyClaims={warrantyClaims.filter(c => c.userId === currentUser.id)}
            returnRequests={returnRequests.filter(r => r.userId === currentUser.id)}
            reviews={reviews}
            onClose={() => setIsOrdersModalOpen(false)}
            onCancelOrder={handleCancelOrder}
            onWarrantySubmit={handleWarrantySubmit}
            onReturnSubmit={handleReturnSubmit}
            onWriteReview={(item) => setItemToReview(item)}
        />
      )}
      
      {itemToReview && (
        <ReviewModal
            item={itemToReview}
            onClose={() => setItemToReview(null)}
            onSubmit={handleReviewSubmit}
        />
      )}

      {isProfileModalOpen && currentUser && (
        <ProfileModal
            user={currentUser}
            onClose={() => setIsProfileModalOpen(false)}
            onUpdateUser={handleUpdateUser}
        />
      )}

      {isLoginModalOpen && (
        <LoginRegisterModal 
          onRegister={handleRegister} 
          onLogin={handleLogin} 
          onClose={() => {
            setIsLoginModalOpen(false);
            setLoginRedirect(null);
          }}
        />
      )}
    </div>
  );
};

export default App;