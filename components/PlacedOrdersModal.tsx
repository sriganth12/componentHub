import React from 'react';
import type { Order, OrderStatus, ComponentItem, WarrantyClaim, ReturnRequest, Review } from '../types';
import ReceiptIcon from './icons/ReceiptIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import UndoIcon from './icons/UndoIcon';
import PencilIcon from './icons/PencilIcon';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import ServiceRequestCard from './ServiceRequestCard';

interface OrdersPageProps {
  orders: Order[];
  warrantyClaims: WarrantyClaim[];
  returnRequests: ReturnRequest[];
  reviews: Review[];
  onBack: () => void;
  onCancelOrder: (order: Order) => void;
  onWarrantySubmit: (item: ComponentItem, orderId: string) => void;
  onReturnSubmit: (item: ComponentItem, orderId: string) => void;
  onWriteReview: (item: ComponentItem) => void;
  onTrackOrder: (order: Order) => void;
}

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

const OrdersPage: React.FC<OrdersPageProps> = ({ orders, warrantyClaims, returnRequests, reviews, onBack, onCancelOrder, onWarrantySubmit, onReturnSubmit, onWriteReview, onTrackOrder }) => {
  const reviewedItemIds = new Set(reviews.map(r => r.componentId));

  const OrderCard = ({ order }: { order: Order }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
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
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-md flex-shrink-0 flex items-center justify-center">
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
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-green-600 bg-green-100 dark:bg-green-900/50 dark:text-green-300 rounded-md hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 dark:disabled:bg-gray-800 dark:disabled:text-gray-400"
                                title={reviewedItemIds.has(item.id) ? 'Review already submitted' : `Write a review for ${item.name}`}
                            >
                                {reviewedItemIds.has(item.id) ? 'Reviewed' : <><PencilIcon className="w-3.5 h-3.5" /><span>Review</span></>}
                            </button>
                            <button
                            onClick={() => onWarrantySubmit(item, order.id)}
                            className="px-3 py-1.5 text-xs font-semibold text-yellow-600 bg-yellow-100 dark:bg-yellow-900/50 dark:text-yellow-300 rounded-md hover:bg-yellow-200 dark:hover:bg-yellow-800/50 transition-colors"
                            title={`Claim warranty for ${item.name}`}
                            >
                            Warranty
                            </button>
                            <button
                                onClick={() => onReturnSubmit(item, order.id)}
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
                        onClick={() => onTrackOrder(order)}
                        className="px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-600 border dark:border-gray-500 rounded-md hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
                    >
                        Track
                    </button>
                )}
                {(order.status === 'Processing' || order.status === 'Shipped') && (
                    <button
                        onClick={() => onCancelOrder(order)}
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
    <div className="animate-fadeIn w-full">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-2">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">My Account</h1>
             <button onClick={onBack} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors group">
                <ArrowLeftIcon className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                Back to Shopping
            </button>
        </div>
        
        <div className="space-y-12">
            {/* Orders Section */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-3 border-b dark:border-gray-700 pb-3">
                    <ReceiptIcon className="w-7 h-7 text-orange-500" />
                    <span>My Orders</span>
                </h2>
                <div className="space-y-4">
                    {orders.length > 0 ? (
                        orders.map(order => <OrderCard key={order.id} order={order} />)
                    ) : (
                        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <ReceiptIcon className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" />
                            <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">No Orders Yet</h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">Your past orders will appear here.</p>
                        </div>
                    )}
                </div>
            </section>
            
            {/* Warranty Section */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-3 border-b dark:border-gray-700 pb-3">
                    <ShieldCheckIcon className="w-7 h-7 text-yellow-500" />
                    <span>Warranty Claims</span>
                </h2>
                <div className="space-y-4">
                     {warrantyClaims.length > 0 ? (
                        warrantyClaims.map(claim => <ServiceRequestCard key={claim.id} request={claim} />)
                    ) : (
                        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <ShieldCheckIcon className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" />
                            <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">No Warranty Claims</h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">Claims you submit will be tracked here.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Returns Section */}
            <section>
                 <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-3 border-b dark:border-gray-700 pb-3">
                    <UndoIcon className="w-7 h-7 text-blue-500" />
                    <span>Return Requests</span>
                </h2>
                <div className="space-y-4">
                    {returnRequests.length > 0 ? (
                        returnRequests.map(request => <ServiceRequestCard key={request.id} request={request} />)
                    ) : (
                        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <UndoIcon className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500" />
                            <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">No Return Requests</h3>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">Your return requests will be shown here.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    </div>
  );
};

export default OrdersPage;