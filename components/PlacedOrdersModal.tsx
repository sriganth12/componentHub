import React, { useState, useEffect } from 'react';
import type { Order, OrderStatus, ComponentItem, WarrantyClaim, ReturnRequest, Review } from '../types';
import XIcon from './icons/XIcon';
import ReceiptIcon from './icons/ReceiptIcon';
import CancelOrderConfirmationModal from './CancelOrderConfirmationModal';
import WarrantyClaimModal from './WarrantyClaimModal';
import WarrantyConfirmationModal from './WarrantyConfirmationModal';
import TrackOrderModal from './TrackOrderModal';
import ReturnItemModal from './ReturnItemModal';
import ReturnConfirmationModal from './ReturnConfirmationModal';
import ServiceRequestCard from './ServiceRequestCard';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import UndoIcon from './icons/UndoIcon';

interface PlacedOrdersModalProps {
  orders: Order[];
  warrantyClaims: WarrantyClaim[];
  returnRequests: ReturnRequest[];
  reviews: Review[];
  onClose: () => void;
  onCancelOrder: (orderId: string, reason: string) => void;
  onWarrantySubmit: (item: ComponentItem, orderId: string, description: string) => void;
  onReturnSubmit: (item: ComponentItem, orderId: string, reason: string) => void;
  onWriteReview: (item: ComponentItem) => void;
}

type ActiveTab = 'orders' | 'warranty' | 'returns';

const OrderStatusIndicator = ({ status }: { status: OrderStatus }) => {
    const statusStyles: { [key in OrderStatus]: string } = {
        Processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        Shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
        'Out for Delivery': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        Delivered: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    };
    return (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[status]}`}>
            {status}
        </span>
    );
};

const PlacedOrdersModal: React.FC<PlacedOrdersModalProps> = ({ orders, warrantyClaims, returnRequests, reviews, onClose, onCancelOrder, onWarrantySubmit, onReturnSubmit, onWriteReview }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
  const [claimInfo, setClaimInfo] = useState<{ item: ComponentItem; orderId: string } | null>(null);
  const [isWarrantyConfirmationOpen, setIsWarrantyConfirmationOpen] = useState(false);
  const [orderToTrack, setOrderToTrack] = useState<Order | null>(null);
  const [returnInfo, setReturnInfo] = useState<{ item: ComponentItem; orderId: string } | null>(null);
  const [isReturnConfirmationOpen, setIsReturnConfirmationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('orders');
  
  const reviewedItemIds = new Set(reviews.map(r => r.componentId));


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const handleWarrantyClaim = (description: string) => {
    if (!claimInfo) return;
    onWarrantySubmit(claimInfo.item, claimInfo.orderId, description);
    setClaimInfo(null);
    setIsWarrantyConfirmationOpen(true);
  };

  const handleReturnRequest = (reason: string) => {
    if (!returnInfo) return;
    onReturnSubmit(returnInfo.item, returnInfo.orderId, reason);
    setReturnInfo(null);
    setIsReturnConfirmationOpen(true);
  };

  const TabButton = ({ tabName, label, icon, count }: { tabName: ActiveTab; label: string; icon: React.ReactNode; count: number }) => (
    <button
        onClick={() => setActiveTab(tabName)}
        className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 font-semibold text-sm transition-colors rounded-t-lg border-b-2 relative ${
            activeTab === tabName
                ? 'text-orange-600 border-orange-600'
                : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-orange-500 hover:border-gray-300 dark:hover:border-gray-600'
        }`}
    >
        {icon}
        {label}
        {count > 0 && <span className="ml-1 bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">{count}</span>}
    </button>
  );


  const OrderCard = ({ order }: { order: Order }) => (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
            <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100">Order #{order.id.slice(-6)}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{order.date}</p>
            </div>
            <OrderStatusIndicator status={order.status} />
        </div>

        <div className="space-y-2 mb-3 divide-y divide-gray-200 dark:divide-gray-600">
            {order.items.map(item => (
                <div key={item.id} className="flex items-center gap-3 text-sm pt-2 first:pt-0">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-md flex-shrink-0 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-gray-500 dark:text-gray-300" />
                    </div>
                    <div className="flex-grow">
                        <p className="text-gray-700 dark:text-gray-200 font-medium">{item.name}</p>
                        <p className="text-gray-500 dark:text-gray-400">Qty: {item.quantity} &bull; ₹{item.price.toFixed(2)}</p>
                    </div>
                     {order.status === 'Delivered' && (
                        <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                             <button
                                onClick={() => onWriteReview(item)}
                                disabled={reviewedItemIds.has(item.id)}
                                className="px-3 py-1.5 text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/50 dark:text-green-300 rounded-md hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title={reviewedItemIds.has(item.id) ? 'Review already submitted' : `Write a review for ${item.name}`}
                            >
                                {reviewedItemIds.has(item.id) ? 'Reviewed' : 'Review'}
                            </button>
                            <button
                            onClick={() => setClaimInfo({ item, orderId: order.id })}
                            className="px-3 py-1.5 text-xs font-semibold text-yellow-600 bg-yellow-100 dark:bg-yellow-900/50 dark:text-yellow-300 rounded-md hover:bg-yellow-200 dark:hover:bg-yellow-800/50 transition-colors"
                            title={`Claim warranty for ${item.name}`}
                            >
                            Warranty
                            </button>
                            <button
                                onClick={() => setReturnInfo({ item, orderId: order.id })}
                                className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                                title={`Return ${item.name}`}
                            >
                                Return
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
        
        {order.status === 'Cancelled' && order.cancellationReason && (
          <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 p-2 rounded-md mb-3">
              <strong>Reason:</strong> {order.cancellationReason}
          </p>
        )}

        <div className="flex justify-between items-center border-t dark:border-gray-600 pt-3">
            <span className="font-bold text-gray-800 dark:text-gray-100">Total: ₹{order.total.toFixed(2)}</span>
            <div className="flex gap-2 flex-wrap justify-end">
                {order.status !== 'Cancelled' && (
                    <button
                        onClick={() => setOrderToTrack(order)}
                        className="px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-600 border dark:border-gray-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                    >
                        Track
                    </button>
                )}
                {(order.status === 'Processing' || order.status === 'Shipped') && (
                    <button
                        onClick={() => setOrderToCancel(order.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-100 dark:bg-red-900/50 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    </div>
  );

  return (
    <>
      <div 
          className={`fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
          onClick={handleClose}
      >
        <div 
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transition-transform duration-300 ${isClosing ? 'animate-scaleOut' : 'animate-scaleIn'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-5 border-b dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Account</h2>
            <button onClick={handleClose} className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex border-b dark:border-gray-700 px-2 sm:px-4">
            <TabButton tabName="orders" label="Orders" icon={<ReceiptIcon className="w-5 h-5" />} count={orders.length} />
            <TabButton tabName="warranty" label="Warranty" icon={<ShieldCheckIcon className="w-5 h-5" />} count={warrantyClaims.length} />
            <TabButton tabName="returns" label="Returns" icon={<UndoIcon className="w-5 h-5" />} count={returnRequests.length} />
          </div>
          
          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {activeTab === 'orders' && (
                orders.length > 0 ? (
                    orders.map(order => <OrderCard key={order.id} order={order} />)
                ) : (
                    <div className="text-center py-16">
                        <ReceiptIcon className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" />
                        <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">No Orders Yet</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Your past orders will appear here.</p>
                    </div>
                )
            )}
            {activeTab === 'warranty' && (
                 warrantyClaims.length > 0 ? (
                    warrantyClaims.map(claim => <ServiceRequestCard key={claim.id} request={claim} />)
                ) : (
                    <div className="text-center py-16">
                        <ShieldCheckIcon className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" />
                        <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">No Warranty Claims</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Claims you submit will be tracked here.</p>
                    </div>
                )
            )}
            {activeTab === 'returns' && (
                 returnRequests.length > 0 ? (
                    returnRequests.map(request => <ServiceRequestCard key={request.id} request={request} />)
                ) : (
                    <div className="text-center py-16">
                        <UndoIcon className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" />
                        <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">No Return Requests</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Your return requests will be shown here.</p>
                    </div>
                )
            )}
          </div>
        </div>
      </div>
      
      {orderToCancel && (
        <CancelOrderConfirmationModal
            orderId={orderToCancel}
            onClose={() => setOrderToCancel(null)}
            onConfirm={(reason) => {
                onCancelOrder(orderToCancel, reason);
                setOrderToCancel(null);
            }}
        />
      )}

      {claimInfo && (
          <WarrantyClaimModal
              item={claimInfo.item}
              onClose={() => setClaimInfo(null)}
              onSubmit={handleWarrantyClaim}
          />
      )}
      
      {isWarrantyConfirmationOpen && (
          <WarrantyConfirmationModal onClose={() => setIsWarrantyConfirmationOpen(false)} />
      )}

      {orderToTrack && (
        <TrackOrderModal order={orderToTrack} onClose={() => setOrderToTrack(null)} />
      )}
      
      {returnInfo && (
        <ReturnItemModal
          item={returnInfo.item}
          onClose={() => setReturnInfo(null)}
          onSubmit={handleReturnRequest}
        />
      )}

      {isReturnConfirmationOpen && (
        <ReturnConfirmationModal onClose={() => setIsReturnConfirmationOpen(false)} />
      )}
    </>
  );
};

export default PlacedOrdersModal;