import React from 'react';
import type { WarrantyClaim, ReturnRequest, WarrantyClaimStatus, ReturnRequestStatus } from '../types';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import UndoIcon from './icons/UndoIcon';

type ServiceRequest = WarrantyClaim | ReturnRequest;

interface ServiceRequestCardProps {
  request: ServiceRequest;
}

const StatusIndicator = ({ status }: { status: WarrantyClaimStatus | ReturnRequestStatus }) => {
    const statusStyles: { [key: string]: string } = {
        Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        Approved: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        Shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
        Received: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    };
    return (
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[status] || ''}`}>
            {status}
        </span>
    );
};

const ServiceRequestCard: React.FC<ServiceRequestCardProps> = ({ request }) => {
  const isWarranty = 'description' in request;

  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
        <div>
          <h3 className="font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            {isWarranty ? <ShieldCheckIcon className="w-5 h-5 text-yellow-500" /> : <UndoIcon className="w-5 h-5 text-blue-500" />}
            {isWarranty ? 'Warranty Claim' : 'Return Request'} #{request.id.slice(-6)}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{request.date}</p>
        </div>
        <StatusIndicator status={request.status} />
      </div>

      <div className="flex items-center gap-3 text-sm py-2 border-t dark:border-gray-600">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-md flex-shrink-0 flex items-center justify-center">
            <request.item.icon className="w-6 h-6 text-gray-500 dark:text-gray-300" />
        </div>
        <div className="flex-grow">
            <p className="text-gray-700 dark:text-gray-200 font-medium">{request.item.name}</p>
            <p className="text-gray-500 dark:text-gray-400">From Order #{request.orderId.slice(-6)}</p>
        </div>
      </div>
      
      <div className="border-t dark:border-gray-600 pt-2 mt-2">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{isWarranty ? 'Issue Description:' : 'Reason for Return:'}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">"{isWarranty ? request.description : request.reason}"</p>
      </div>
    </div>
  );
};

export default ServiceRequestCard;