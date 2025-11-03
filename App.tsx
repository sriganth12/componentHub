import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Brand, ComponentItem, CartItem, Order, User, OrderStatus, DeliveryOption, WarrantyClaim, ReturnRequest, WarrantyClaimStatus, ReturnRequestStatus, Review, FlatComponentItem } from './types';
import { BRANDS_DATA, DELIVERY_OPTIONS, ORDER_STATUS_PROGRESSION, WARRANTY_STATUS_PROGRESSION, RETURN_STATUS_PROGRESSION, REVIEWS_DATA } from './constants';
import Header from './components/Header';
import BrandCard from './components/RestaurantCard';
import BrandComponentsView from './components/BrandComponentsView';
import Cart from './components/Cart';
import CheckoutPage from './components/PaymentModal';
import OrderConfirmationPage from './components/OrderConfirmationModal';
import OrdersPage from './components/PlacedOrdersModal';
import LoginPage from './components/LoginRegisterModal';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfileModal';
import PaymentMethodPage, { PaymentMethod } from './components/PaymentMethodModal';
import CardDetailsPage from './components/CardDetailsModal';
import ReviewPage from './components/ReviewModal';
import CarouselBanner from './components/CarouselBanner';
import MobileIcon from './components/icons/MobileIcon';
import TvIcon from './components/icons/TvIcon';
import LaptopIcon from './components/icons/LaptopIcon';
import WatchIcon from './components/icons/WatchIcon';
import CancelOrderPage from './components/CancelOrderConfirmationModal';
import WarrantyClaimPage from './components/WarrantyClaimModal';
import ReturnItemPage from './components/ReturnItemModal';
import TrackOrderPage from './components/TrackOrderModal';
import WarrantyConfirmationPage from './components/WarrantyConfirmationModal';
import ReturnConfirmationPage from './components/ReturnConfirmationModal';


type View = 'brands' | 'cart' | 'brandComponents' | 'checkout' | 'paymentMethods' | 'cardDetails' | 'orderConfirmation' | 'orders' | 'profile' | 'login' | 'register' | 'review' | 'cancelOrder' | 'warrantyClaim' | 'returnItem' | 'trackOrder' | 'warrantyConfirmation' | 'returnConfirmation';
type AuthStatus = 'guest' | 'authenticated';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const [isScrolled, setIsScrolled] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [placedOrders, setPlacedOrders] = useState<Order[]>([]);
  const [view, setView] = useState<View>('brands');
  const [previousView, setPreviousView] = useState<View>('brands');
  
  const [authStatus, setAuthStatus] = useState<AuthStatus>('guest');

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [pendingDeliveryOption, setPendingDeliveryOption] = useState<DeliveryOption | null>(null);

  const [warrantyClaims, setWarrantyClaims] = useState<WarrantyClaim[]>([]);
  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>([]);
  
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [itemToReview, setItemToReview] = useState<ComponentItem | null>(null);

  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null);
  const [claimInfo, setClaimInfo] = useState<{ item: ComponentItem; orderId: string } | null>(null);
  const [orderToTrack, setOrderToTrack] = useState<Order | null>(null);
  const [returnInfo, setReturnInfo] = useState<{ item: ComponentItem; orderId: string } | null>(null);

  
  const groupedBrands = useMemo(() => {
    const groups: { [key: string]: Brand[] } = {
        'Mobile': [],
        'TV': [],
        'Laptop': [],
        'Watch': [],
    };

    BRANDS_DATA.forEach(brand => {
        const componentCategory = brand.components.length > 0 ? brand.category : 'Mobile';
        const categoryKey = ['Premium', 'Mid-Range', 'Value'].includes(componentCategory) ? 'Mobile' : componentCategory;

        if (groups[categoryKey]) {
            groups[categoryKey].push(brand);
        }
    });

    // Ensure the order is consistent
    return {
        'Mobile': groups['Mobile'],
        'TV': groups['TV'],
        'Laptop': groups['Laptop'],
        'Watch': groups['Watch'],
    };
  }, []);


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
    setView('paymentMethods');
  };

  const handlePaymentMethodConfirm = (method: PaymentMethod) => {
    if (method === 'card') {
      setView('cardDetails');
    } else {
      // For COD, Paypal, etc., confirm immediately.
      handleConfirmPayment();
    }
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
    setView('orderConfirmation');
  };
  
  const handleCancelOrder = (orderId: string, reason: string) => {
    setPlacedOrders(prev => prev.map(order => 
      order.id === orderId 
        ? {...order, status: 'Cancelled', cancellationReason: reason} 
        : order
    ));
    setView('orders');
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
    setView('warrantyConfirmation');
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
      setView('returnConfirmation');
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
        verifiedPurchase: true,
    };
    setReviews(prev => [newReview, ...prev]);
    setItemToReview(null);
    setView('orders');
  };

  const handleRegister = (newUser: Omit<User, 'id'>) => {
    const userWithId = { ...newUser, id: `user-${Date.now()}`};
    setUsers(prev => [...prev, userWithId]);
    setCurrentUser(userWithId);
    setAuthStatus('authenticated');
    setView(previousView);
  };

  const handleLogin = (credentials: {email: string, password: string}) => {
    const user = users.find(u => u.email === credentials.email);
    // In a real app, we'd also check the password here.
    if(user) {
      setCurrentUser(user);
      setAuthStatus('authenticated');
      setView(previousView);
      return true;
    }
    return false;
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    setCartItems([]);
    setAuthStatus('guest');
    setView('brands');
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
  
  const handleBackToBrands = useCallback(() => {
    setView('brands');
    setSelectedBrand(null);
    window.scrollTo(0, 0);
  }, []);

  const handleLoginRequired = (targetView: View) => {
    if (currentUser) {
        setView(targetView);
    } else {
        setPreviousView(view);
        setView('login');
    }
  };
  
  const renderView = () => {
    switch (view) {
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigateToRegister={() => setView('register')} onClose={() => setView(previousView)} />;
      case 'register':
        return <RegisterPage onRegister={handleRegister} onNavigateToLogin={() => setView('login')} onClose={() => setView(previousView)} />;
      case 'cart':
        return (
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onClose={handleBackToBrands}
            onCheckout={() => {
              if (cartItems.length > 0) {
                 if (currentUser) {
                  setView('checkout');
                } else {
                  setPreviousView('checkout');
                  setView('login');
                }
              }
            }}
          />
        );
      case 'checkout':
        return currentUser && <CheckoutPage user={currentUser} cartItems={cartItems} onBack={() => setView('cart')} onProceedToPayment={handleProceedToPayment} />;
      case 'paymentMethods':
        return <PaymentMethodPage totalAmount={orderTotal} onBack={() => setView('checkout')} onConfirm={handlePaymentMethodConfirm} />;
      case 'cardDetails':
        return <CardDetailsPage totalAmount={orderTotal} onBack={() => setView('paymentMethods')} onConfirmPayment={handleConfirmPayment} />;
      case 'orderConfirmation':
        return <OrderConfirmationPage onContinueShopping={handleBackToBrands} />;
      case 'orders':
        return currentUser && <OrdersPage 
            orders={placedOrders.filter(o => o.userId === currentUser.id)}
            warrantyClaims={warrantyClaims.filter(c => c.userId === currentUser.id)}
            returnRequests={returnRequests.filter(r => r.userId === currentUser.id)}
            reviews={reviews}
            onBack={handleBackToBrands}
            onCancelOrder={(order) => { setOrderToCancel(order); setView('cancelOrder'); }}
            onWarrantySubmit={(item, orderId) => { setClaimInfo({item, orderId}); setView('warrantyClaim'); }}
            onReturnSubmit={(item, orderId) => { setReturnInfo({item, orderId}); setView('returnItem'); }}
            onWriteReview={(item) => { setItemToReview(item); setView('review'); }}
            onTrackOrder={(order) => { setOrderToTrack(order); setView('trackOrder'); }}
        />;
      case 'cancelOrder':
        return orderToCancel && <CancelOrderPage order={orderToCancel} onClose={() => setView('orders')} onConfirm={handleCancelOrder} />;
      case 'warrantyClaim':
        return claimInfo && <WarrantyClaimPage item={claimInfo.item} onClose={() => setView('orders')} onSubmit={(desc) => handleWarrantySubmit(claimInfo.item, claimInfo.orderId, desc)} />;
      case 'warrantyConfirmation':
        return <WarrantyConfirmationPage onClose={() => setView('orders')} />;
      case 'returnItem':
        return returnInfo && <ReturnItemPage item={returnInfo.item} onClose={() => setView('orders')} onSubmit={(reason) => handleReturnSubmit(returnInfo.item, returnInfo.orderId, reason)} />;
      case 'returnConfirmation':
        return <ReturnConfirmationPage onClose={() => setView('orders')} />;
      case 'trackOrder':
        return orderToTrack && <TrackOrderPage order={orderToTrack} onClose={() => setView('orders')} />;
      case 'review':
        return itemToReview && <ReviewPage item={itemToReview} onClose={() => setView('orders')} onSubmit={handleReviewSubmit} />;
      case 'profile':
        return currentUser && <ProfilePage user={currentUser} onBack={() => setView('brands')} onUpdateUser={handleUpdateUser} />;
      case 'brandComponents':
        return selectedBrand && (
            <BrandComponentsView
              brand={selectedBrand}
              onBack={handleBackToBrands}
              onAddToCart={handleAddToCart}
              reviews={reviews}
            />
        );
      case 'brands':
      default:
        const categoryHeadings: { [key: string]: string } = {
          Mobile: 'Mobile Spare Parts',
          TV: 'TV Spare Parts',
          Laptop: 'Laptop Spare Parts',
          Watch: 'Watch Spare Parts',
        };
         const categoryIcons: { [key: string]: React.FC<{ className?: string }> } = {
            Mobile: MobileIcon,
            TV: TvIcon,
            Laptop: LaptopIcon,
            Watch: WatchIcon,
        };

        return (
          <>
            <CarouselBanner />
            <div className="space-y-8">
              {Object.entries(groupedBrands).map(([category, brands]) => {
                 const CategoryIcon = categoryIcons[category];
                 return (
                    brands.length > 0 && (
                    <section key={category} className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-md p-6">
                        <div className="flex items-center gap-4 mb-6">
                            {CategoryIcon && (
                            <div className="bg-orange-100 dark:bg-gray-700 p-3 rounded-full">
                                <CategoryIcon className="w-8 h-8 text-orange-500 dark:text-orange-400" />
                            </div>
                            )}
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                            {categoryHeadings[category]}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {brands.map((brand, index) => (
                            <BrandCard
                                key={brand.id}
                                brand={brand}
                                onClick={() => {
                                    setSelectedBrand(brand);
                                    setView('brandComponents');
                                    window.scrollTo(0, 0);
                                }}
                                index={index}
                            />
                        ))}
                        </div>
                    </section>
                    )
                 );
              })}
            </div>
          </>
        );
    }
  };

  const mainContentHidden = view === 'login' || view === 'register';

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans transition-colors duration-300">
      {!mainContentHidden && (
        <Header 
            cartItemCount={cartItemCount}
            theme={theme}
            toggleTheme={toggleTheme}
            isScrolled={isScrolled}
            onLogoClick={handleBackToBrands}
            onCartClick={() => setView('cart')}
            onOrdersClick={() => handleLoginRequired('orders')}
            onProfileClick={() => handleLoginRequired('profile')}
            onLogout={handleLogout}
            onLoginClick={() => {
                setPreviousView(view);
                setView('login');
            }}
            currentUser={currentUser}
        />
      )}

      <main className={!mainContentHidden ? "container mx-auto px-4 sm:px-6 lg:px-8 py-8" : ""}>
        {renderView()}
      </main>
    </div>
  );
};

export default App;