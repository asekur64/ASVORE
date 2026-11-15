import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Language, 
  Product, 
  Category, 
  CartItem, 
  Order, 
  OrderStatus, 
  PaymentStatus, 
  Coupon, 
  CustomerReview, 
  SiteSettings, 
  UserAccount,
  OrderCustomer,
  PaymentMethod
} from '../types';
import { translations } from '../data/translations';
import { 
  INITIAL_SETTINGS, 
  INITIAL_PRODUCTS, 
  INITIAL_COUPONS, 
  INITIAL_REVIEWS, 
  INITIAL_ORDERS 
} from '../data/initialData';
import { resolveImageUrl } from '../assets/images';

export type ActiveView = 
  | 'home' 
  | 'catalog' 
  | 'product' 
  | 'checkout' 
  | 'account' 
  | 'track' 
  | 'admin' 
  | 'about' 
  | 'contact' 
  | 'policies';

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations['en'], params?: Record<string, string | number>) => string;
  formatPrice: (amount: number) => string;

  // Navigation
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  openProduct: (id: string) => void;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isAdminAuthOpen: boolean;
  setIsAdminAuthOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (val: boolean) => void;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  isFirebaseStatusModalOpen: boolean;
  setIsFirebaseStatusModalOpen: (open: boolean) => void;
  viewingInvoiceOrder: Order | null;
  setViewingInvoiceOrder: (order: Order | null) => void;

  // Search & Catalog
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: Category | null;
  setSelectedCategory: (cat: Category | null) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => void;
  updateCartQuantity: (itemId: string, qty: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  couponDiscount: number;
  addCoupon: (c: Omit<Coupon, 'id' | 'usageCount'>) => void;
  deleteCoupon: (id: string) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  createOrder: (customer: OrderCustomer, paymentMethod: PaymentMethod) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  updateOrderPaymentStatus: (orderId: string, status: PaymentStatus) => void;

  // Settings
  settings: SiteSettings;
  updateSettings: (updates: Partial<SiteSettings>) => void;

  // Reviews
  reviews: CustomerReview[];
  addReview: (review: Omit<CustomerReview, 'id' | 'date' | 'isApproved'>) => void;
  approveReview: (reviewId: string) => void;

  // User
  currentUser: UserAccount | null;
  loginUser: (phone: string, name?: string) => void;
  logoutUser: () => void;
  updateUserProfile: (updates: Partial<UserAccount>) => void;

  // Notifications
  toasts: ToastNotification[];
  notify: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
}

const safeStorageGet = (key: string): string | null => {
  try {
    return typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
  } catch {
    return null;
  }
};

const safeStorageSet = (key: string, value: string): void => {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
  } catch {
    // Ignore storage quota / security restrictions
  }
};

const safeStorageRemove = (key: string): void => {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  } catch {
    // Ignore storage restrictions
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguage] = useState<Language>(() => {
    const saved = safeStorageGet('asvore_lang');
    return saved === 'bn' ? 'bn' : 'en';
  });

  const toggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'bn' : 'en';
      safeStorageSet('asvore_lang', next);
      return next;
    });
  };

  const t = (key: keyof typeof translations['en'], params?: Record<string, string | number>): string => {
    const dict = translations[language] || translations.en;
    let text = dict[key] || translations.en[key] || String(key);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  };

  const formatPrice = (amount: number): string => {
    if (language === 'bn') {
      const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      const formatted = amount.toLocaleString('en-IN').replace(/[0-9]/g, d => banglaDigits[parseInt(d, 10)]);
      return `৳${formatted}`;
    }
    return `৳${amount.toLocaleString('en-IN')}`;
  };

  // 2. Navigation & views
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const openProduct = (id: string) => {
    setSelectedProductId(id);
    setActiveView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return safeStorageGet('asvore_admin_auth') === 'true';
  });
  const [isFirebaseStatusModalOpen, setIsFirebaseStatusModalOpen] = useState(false);
  const [viewingInvoiceOrder, setViewingInvoiceOrder] = useState<Order | null>(null);

  // 4. Products (with automated image sync for demo items)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = safeStorageGet('asvore_products');
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        // Ensure demo products have the updated distinct category images
        const updated = parsed.map(item => {
          const initialMatch = INITIAL_PRODUCTS.find(ip => ip.id === item.id);
          if (initialMatch && item.isDemo !== false) {
            return {
              ...item,
              images: initialMatch.images,
              isTrending: initialMatch.isTrending ?? item.isTrending,
              isDemo: true,
            };
          }
          return {
            ...item,
            images: (item.images || []).map(resolveImageUrl),
          };
        });
        return updated;
      }
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    safeStorageSet('asvore_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...prodData,
      id: `asv-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setProducts(prev => [newProduct, ...prev]);
    notify('Product added successfully', 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    notify('Product updated', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    notify('Product removed', 'info');
  };

  // 5. Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // 6. Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('asvore_cart');
      if (!saved) return [];
      const parsed: CartItem[] = JSON.parse(saved);
      return parsed.map(item => ({ ...item, image: resolveImageUrl(item.image) }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    safeStorageSet('asvore_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, size?: string, color?: string, quantity = 1) => {
    if (product.stock <= 0) {
      notify('This item is currently out of stock', 'error');
      return;
    }

    const itemSize = size || (product.sizes ? product.sizes[0] : undefined);
    const itemColor = color || (product.colors ? product.colors[0].name : undefined);
    const cartItemId = `${product.id}-${itemSize || 'def'}-${itemColor || 'def'}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        if (newQty === existing.quantity) {
          notify(`Maximum available inventory reached (${product.stock} items)`, 'info');
          return prev;
        }
        return prev.map(item => item.id === cartItemId ? { ...item, quantity: newQty } : item);
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          category: product.category,
          image: product.images[0],
          price: product.salePrice || product.price,
          size: itemSize,
          color: itemColor,
          quantity: Math.min(quantity, product.stock),
          maxStock: product.stock,
        };
        return [...prev, newItem];
      }
    });

    notify(`${product.name[language]} added to bag`, 'success');
    setIsCartOpen(true);
  };

  const updateCartQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const boundedQty = Math.min(qty, item.maxStock);
        if (qty > item.maxStock) {
          notify(`Only ${item.maxStock} items available in stock`, 'info');
        }
        return { ...item, quantity: boundedQty };
      }
      return item;
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    notify('Item removed from shopping bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // 7. Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('asvore_coupons');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  useEffect(() => {
    safeStorageSet('asvore_coupons', JSON.stringify(coupons));
  }, [coupons]);

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find(c => c.code === cleanCode && c.isActive);

    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }

    if (found.minSpend && cartSubtotal < found.minSpend) {
      return { 
        success: false, 
        message: `This coupon requires a minimum subtotal of ${formatPrice(found.minSpend)}.` 
      };
    }

    // Check expiry
    if (new Date(found.expiryDate) < new Date()) {
      return { success: false, message: 'This coupon has expired.' };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    notify('Coupon removed', 'info');
  };

  let couponDiscount = 0;
  if (appliedCoupon && cartSubtotal > 0) {
    if (appliedCoupon.type === 'percentage') {
      const calculated = (cartSubtotal * appliedCoupon.value) / 100;
      couponDiscount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
    } else {
      couponDiscount = Math.min(appliedCoupon.value, cartSubtotal);
    }
  }

  const addCoupon = (c: Omit<Coupon, 'id' | 'usageCount'>) => {
    const newCoupon: Coupon = {
      ...c,
      id: `cp-${Date.now()}`,
      usageCount: 0
    };
    setCoupons(prev => [newCoupon, ...prev]);
    notify(`Coupon ${c.code} created`, 'success');
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    if (appliedCoupon?.id === id) {
      setAppliedCoupon(null);
    }
    notify('Coupon deleted', 'info');
  };

  // 8. Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('asvore_wishlist');
      return saved ? JSON.parse(saved) : ['asv-panjabi-01', 'asv-perfume-01'];
    } catch {
      return ['asv-panjabi-01'];
    }
  });

  useEffect(() => {
    safeStorageSet('asvore_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        notify('Removed from Wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        notify('Saved to Wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // 9. Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('asvore_orders');
      if (!saved) return INITIAL_ORDERS;
      const parsed: Order[] = JSON.parse(saved);
      return parsed.map(order => ({
        ...order,
        items: (order.items || []).map(item => ({ ...item, image: resolveImageUrl(item.image) })),
      }));
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    safeStorageSet('asvore_orders', JSON.stringify(orders));
  }, [orders]);

  // 10. Settings
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = safeStorageGet('asvore_settings');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  useEffect(() => {
    safeStorageSet('asvore_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (updates: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
    notify('Settings updated successfully', 'success');
  };

  // 11. Customer Account
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = safeStorageGet('asvore_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const loginUser = (phone: string, name?: string) => {
    const resolvedName = name || 'Valued Gentleman';
    const user: UserAccount = {
      id: `usr-${phone.replace(/[^0-9]/g, '')}`,
      phone,
      name: resolvedName,
      savedAddresses: [
        {
          id: 'addr-1',
          label: 'Primary Delivery Address',
          isDefault: true,
          recipientName: resolvedName,
          phone,
          division: 'Dhaka',
          district: 'Dhaka',
          upazila: 'Gulshan',
          address: 'House 14, Road 71, Gulshan 2, Dhaka'
        }
      ]
    };
    setCurrentUser(user);
    safeStorageSet('asvore_user', JSON.stringify(user));
    notify('Logged in successfully', 'success');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    safeStorageRemove('asvore_user');
    notify('Logged out', 'info');
  };

  const updateUserProfile = (updates: Partial<UserAccount>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    safeStorageSet('asvore_user', JSON.stringify(updated));
    notify('Profile updated', 'success');
  };

  // Order Placement
  const createOrder = (customer: OrderCustomer, paymentMethod: PaymentMethod): Order => {
    const isInsideDhaka = customer.district.toLowerCase() === 'dhaka';
    const deliveryRate = isInsideDhaka ? settings.deliveryInsideDhaka : settings.deliveryOutsideDhaka;
    const deliveryFee = cartSubtotal >= settings.freeDeliveryThreshold ? 0 : deliveryRate;

    const finalTotal = Math.max(0, cartSubtotal - couponDiscount + deliveryFee);
    const orderNum = `ASV-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      customer,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: couponDiscount,
      couponCode: appliedCoupon?.code,
      deliveryCharge: deliveryFee,
      total: finalTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Pending',
      status: 'Order Placed',
      trackingNumber: `STE-${Math.floor(10000 + Math.random() * 90000)}`,
      statusHistory: [
        {
          status: 'Order Placed',
          timestamp: new Date().toISOString(),
          note: `Order placed via ${paymentMethod}. Verification pending.`
        }
      ]
    };

    // Deduct stock
    setProducts(prev => prev.map(prod => {
      const cartMatch = cart.find(ci => ci.productId === prod.id);
      if (cartMatch) {
        return {
          ...prod,
          stock: Math.max(0, prod.stock - cartMatch.quantity)
        };
      }
      return prod;
    }));

    // Save order
    setOrders(prev => [newOrder, ...prev]);

    // Update coupon usage if applied
    if (appliedCoupon) {
      setCoupons(prev => prev.map(c => c.id === appliedCoupon.id ? { ...c, usageCount: c.usageCount + 1 } : c));
    }

    clearCart();
    setAppliedCoupon(null);
    notify(`Order #${orderNum} placed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, note?: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const history = [...o.statusHistory, {
          status,
          timestamp: new Date().toISOString(),
          note: note || `Status updated to ${status}`
        }];
        return {
          ...o,
          status,
          statusHistory: history
        };
      }
      return o;
    }));
    notify(`Order status updated to "${status}"`, 'success');
  };

  const updateOrderPaymentStatus = (orderId: string, status: PaymentStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, paymentStatus: status } : o));
    notify(`Payment status marked as "${status}"`, 'success');
  };

  // 12. Reviews
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = safeStorageGet('asvore_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const addReview = (revData: Omit<CustomerReview, 'id' | 'date' | 'isApproved'>) => {
    const newRev: CustomerReview = {
      ...revData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isApproved: false, // requires admin approval
    };
    setReviews(prev => [newRev, ...prev]);
    notify('Review submitted! It will appear after administrative approval.', 'info');
  };

  const approveReview = (reviewId: string) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, isApproved: true } : r));
    notify('Review approved and published', 'success');
  };

  // 13. Admin Auth
  const loginAdmin = (pin: string): boolean => {
    if (pin === '1234' || pin === 'asvore2026') {
      setIsAdminAuthenticated(true);
      safeStorageSet('asvore_admin_auth', 'true');
      notify('Admin access granted', 'success');
      return true;
    }
    notify('Invalid Admin Security PIN', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    safeStorageRemove('asvore_admin_auth');
    notify('Logged out from Admin Dashboard', 'info');
  };

  // 14. Notifications / Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const notify = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        formatPrice,

        activeView,
        setActiveView,
        selectedProductId,
        setSelectedProductId,
        openProduct,

        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAdminAuthOpen,
        setIsAdminAuthOpen,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        isFirebaseStatusModalOpen,
        setIsFirebaseStatusModalOpen,
        viewingInvoiceOrder,
        setViewingInvoiceOrder,

        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        products,
        addProduct,
        updateProduct,
        deleteProduct,

        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartCount,

        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        couponDiscount,
        addCoupon,
        deleteCoupon,

        wishlist,
        toggleWishlist,
        isInWishlist,

        orders,
        createOrder,
        updateOrderStatus,
        updateOrderPaymentStatus,

        settings,
        updateSettings,

        reviews,
        addReview,
        approveReview,

        currentUser,
        loginUser,
        logoutUser,
        updateUserProfile,

        toasts,
        notify,
        dismissToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
