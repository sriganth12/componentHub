import React from 'react';

export interface ComponentItem {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: React.FC<{ className?: string }>;
  compatibility: string[];
  warrantyPeriod: string;
  specifications: Record<string, string>;
  inTheBox: string[];
  keyFeatures: string[];
}

// FIX: Add the missing FlatComponentItem interface.
export interface FlatComponentItem extends ComponentItem {
  brandId: number;
  brandName: string;
}

export interface Brand {
  id: number;
  name: string;
  category: string;
  rating: number;
  shippingTime: number;
  icon: React.FC<{ className?: string }>;
  components: ComponentItem[];
}

export interface CartItem extends ComponentItem {
  quantity: number;
  brandId: number;
  brandName: string;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';

export interface DeliveryOption {
  id: string;
  name: string;
  days: string;
  cost: number;
}

export interface Order {
    id: string;
    date: string;
    items: CartItem[];
    total: number;
    status: OrderStatus;
    userId: string;
    deliveryDate?: string;
    deliveryOption: DeliveryOption;
    cancellationReason?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    address: string;
    state?: string;
    country?: string;
    pinCode?: string;
    phoneNumber?: string;
}

export type WarrantyClaimStatus = 'Pending' | 'Approved' | 'Shipped' | 'Rejected';
export type ReturnRequestStatus = 'Pending' | 'Approved' | 'Received' | 'Rejected';

export interface WarrantyClaim {
    id: string;
    orderId: string;
    date: string;
    item: ComponentItem;
    status: WarrantyClaimStatus;
    description: string;
    userId: string;
}

export interface ReturnRequest {
    id: string;
    orderId: string;
    date: string;
    item: ComponentItem;
    status: ReturnRequestStatus;
    reason: string;
    userId: string;
}

export interface Review {
    id: string;
    componentId: number;
    userId: string;
    userName: string;
    rating: number; // 1-5
    comment: string;
    date: string;
    verifiedPurchase: boolean;
}