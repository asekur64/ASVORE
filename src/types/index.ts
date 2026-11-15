export type Language = 'en' | 'bn';

export type Category = 
  | 'T-Shirts'
  | 'Shirts'
  | 'Trousers'
  | 'Panjabis'
  | 'Watches'
  | 'Belts'
  | 'Wallets'
  | 'Sunglasses'
  | 'Perfumes';

export interface Product {
  id: string;
  sku: string;
  name: {
    en: string;
    bn: string;
  };
  category: Category;
  images: string[];
  description: {
    en: string;
    bn: string;
  };
  details: {
    en: string[];
    bn: string[];
  };
  price: number; // In BDT
  salePrice?: number; // In BDT
  stock: number;
  lowStockThreshold?: number;
  sizes?: string[]; // e.g. ['M', 'L', 'XL', 'XXL'] or ['30', '32', '34', '36']
  colors?: { name: string; hex: string }[];
  specifications: Record<string, string>;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isDemo?: boolean;
  status?: 'active' | 'draft';
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface CartItem {
  id: string; // unique item cart key (productId-size-color)
  productId: string;
  name: {
    en: string;
    bn: string;
  };
  category: Category;
  image: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
  maxStock: number;
}

export type OrderStatus = 
  | 'Order Placed'
  | 'Order Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Return Requested'
  | 'Returned'
  | 'Refunded';

export type PaymentMethod = 'Cash on Delivery' | 'bKash' | 'Nagad';
export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded';

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email?: string;
  division: string;
  district: string;
  upazila: string;
  postalCode?: string;
  address: string;
  notes?: string;
}

export interface OrderStatusHistoryItem {
  status: OrderStatus;
  timestamp: string;
  note?: string;
  updatedBy?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. ASV-8942
  createdAt: string;
  customerId?: string;
  customer: OrderCustomer;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryCharge: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  trackingNumber?: string;
  courierName?: string;
  estimatedDelivery?: string;
  cancellationReason?: string;
  returnReason?: string;
  statusHistory: OrderStatusHistoryItem[];
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number; // e.g. 10 for 10%, or 200 for 200 BDT
  minSpend?: number;
  maxDiscount?: number;
  expiryDate: string;
  isActive: boolean;
  usageCount: number;
  usageLimit?: number;
}

export interface CustomerReview {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  isApproved: boolean;
  verifiedPurchase: boolean;
}

export interface UserAddress {
  id: string;
  label: string; // e.g. 'Home', 'Office'
  isDefault: boolean;
  recipientName: string;
  phone: string;
  division: string;
  district: string;
  upazila: string;
  postalCode?: string;
  address: string;
  instructions?: string;
}

export interface CustomerNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'payment' | 'shipping' | 'promo' | 'system';
  isRead: boolean;
  createdAt: string;
  orderId?: string;
}

export interface NotificationPreferences {
  smsUpdates: boolean;
  whatsappUpdates: boolean;
  emailPromotions: boolean;
}

export interface UserAccount {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  gender?: 'Male' | 'Female' | 'Other';
  dateOfBirth?: string;
  division?: string;
  district?: string;
  upazila?: string;
  postalCode?: string;
  address?: string;
  notes?: string;
  savedAddresses: UserAddress[];
  notificationPreferences?: NotificationPreferences;
  status?: 'active' | 'deactivated';
  createdAt?: string;
}

export type AdminRole = 
  | 'Super Admin' 
  | 'Admin' 
  | 'Order Manager' 
  | 'Product Manager' 
  | 'Support Agent';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  active: boolean;
  lastLogin?: string;
  permissions?: string[];
}

export interface PaymentGatewayConfig {
  cod: {
    enabled: boolean;
    instructions: string;
  };
  bkash: {
    enabled: boolean;
    merchantNumber: string;
    appKeyConfigured: boolean;
    sandboxMode: boolean;
    instructions: string;
  };
  nagad: {
    enabled: boolean;
    merchantNumber: string;
    publicKeyConfigured: boolean;
    instructions: string;
  };
}

export interface SiteSettings {
  announcementText: {
    en: string;
    bn: string;
  };
  announcementActive: boolean;
  heroHeadline: {
    en: string;
    bn: string;
  };
  heroSubtitle: {
    en: string;
    bn: string;
  };
  heroImage?: string;
  deliveryInsideDhaka: number;
  deliveryOutsideDhaka: number;
  deliveryInsideGaibandha: number;
  deliveryOutsideGaibandha: number;
  freeDeliveryThreshold: number;
  estimatedDeliveryDhaka: string;
  estimatedDeliveryOutside: string;
  supportedCouriers: string[];
  phone: string;
  email: string;
  whatsappNumber: string;
  showroomAddress: {
    en: string;
    bn: string;
  };
  facebookUrl: string;
  payments: PaymentGatewayConfig;
}
