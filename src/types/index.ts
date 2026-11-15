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
  sizes?: string[]; // e.g. ['M', 'L', 'XL', 'XXL'] or ['30', '32', '34', '36']
  colors?: { name: string; hex: string }[];
  specifications: Record<string, string>;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isDemo?: boolean;
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
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned';

export type PaymentMethod = 'Cash on Delivery' | 'bKash' | 'Nagad';
export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded';

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email?: string;
  division: string;
  district: string;
  upazila: string;
  address: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. ASV-8942
  createdAt: string;
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
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
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
  deliveryInsideDhaka: number;
  deliveryOutsideDhaka: number;
  freeDeliveryThreshold: number;
  phone: string;
  email: string;
  whatsappNumber: string;
  showroomAddress: {
    en: string;
    bn: string;
  };
  facebookUrl: string;
}

export interface UserAccount {
  id: string;
  name: string;
  phone: string;
  email?: string;
  savedAddresses: {
    id: string;
    label: string;
    division: string;
    district: string;
    upazila: string;
    address: string;
  }[];
}
