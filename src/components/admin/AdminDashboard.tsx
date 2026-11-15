import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, Category, OrderStatus, PaymentStatus, Coupon } from '../../types';
import { IMAGES } from '../../assets/images';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Tag, 
  Settings, 
  Users, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  LogOut, 
  ArrowLeft,
  Search,
  Check,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    orders, 
    updateOrderStatus, 
    updateOrderPaymentStatus, 
    coupons, 
    addCoupon, 
    deleteCoupon, 
    settings, 
    updateSettings, 
    formatPrice, 
    setActiveView, 
    logoutAdmin,
    t 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons' | 'settings'>('overview');

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' || o.status === 'Delivered' ? o.total : 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'Order Placed' || o.status === 'Processing').length;
  const completedOrders = orders.filter(o => o.status === 'Delivered').length;
  const lowStockProducts = products.filter(p => p.stock <= 5);

  // 1. Product Form Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodNameEn, setProdNameEn] = useState('');
  const [prodNameBn, setProdNameBn] = useState('');
  const [prodCategory, setProdCategory] = useState<Category>('Panjabis');
  const [prodPrice, setProdPrice] = useState(2500);
  const [prodSalePrice, setProdSalePrice] = useState<number | undefined>(undefined);
  const [prodStock, setProdStock] = useState(15);
  const [prodImage, setProdImage] = useState(IMAGES.panjabiTraditional);
  const [prodDescEn, setProdDescEn] = useState('');
  const [prodDescBn, setProdDescBn] = useState('');
  const [prodSizes, setProdSizes] = useState('M, L, XL, XXL');
  const [prodIsFeatured, setProdIsFeatured] = useState(false);
  const [prodIsBestSeller, setProdIsBestSeller] = useState(false);
  const [prodIsNewArrival, setProdIsNewArrival] = useState(true);

  // 2. Coupon Form State
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponType, setCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [couponValue, setCouponValue] = useState(10);
  const [couponMinSpend, setCouponMinSpend] = useState(1500);
  const [couponExpiry, setCouponExpiry] = useState('2026-12-31');

  // 3. Settings Form State
  const [settingsForm, setSettingsForm] = useState({ ...settings });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Handlers
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProdNameEn('');
    setProdNameBn('');
    setProdCategory('Panjabis');
    setProdPrice(2500);
    setProdSalePrice(undefined);
    setProdStock(15);
    setProdImage(IMAGES.panjabiTraditional);
    setProdDescEn('');
    setProdDescBn('');
    setProdSizes('M, L, XL, XXL');
    setProdIsFeatured(false);
    setProdIsBestSeller(false);
    setProdIsNewArrival(true);
    setProductModalOpen(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setProdNameEn(p.name.en);
    setProdNameBn(p.name.bn);
    setProdCategory(p.category);
    setProdPrice(p.price);
    setProdSalePrice(p.salePrice);
    setProdStock(p.stock);
    setProdImage(p.images[0]);
    setProdDescEn(p.description.en);
    setProdDescBn(p.description.bn);
    setProdSizes(p.sizes ? p.sizes.join(', ') : '');
    setProdIsFeatured(!!p.isFeatured);
    setProdIsBestSeller(!!p.isBestSeller);
    setProdIsNewArrival(!!p.isNewArrival);
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const sizesArray = prodSizes.split(',').map(s => s.trim()).filter(Boolean);

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: { en: prodNameEn, bn: prodNameBn || prodNameEn },
        category: prodCategory,
        price: prodPrice,
        salePrice: prodSalePrice ? Number(prodSalePrice) : undefined,
        stock: prodStock,
        images: [prodImage],
        description: { en: prodDescEn, bn: prodDescBn || prodDescEn },
        sizes: sizesArray.length > 0 ? sizesArray : undefined,
        isFeatured: prodIsFeatured,
        isBestSeller: prodIsBestSeller,
        isNewArrival: prodIsNewArrival,
      });
    } else {
      addProduct({
        sku: `ASV-${Math.floor(1000 + Math.random() * 9000)}`,
        name: { en: prodNameEn, bn: prodNameBn || prodNameEn },
        category: prodCategory,
        price: prodPrice,
        salePrice: prodSalePrice ? Number(prodSalePrice) : undefined,
        stock: prodStock,
        images: [prodImage],
        description: { en: prodDescEn, bn: prodDescBn || prodDescEn },
        details: {
          en: ['Crafted with premium sartorial techniques', 'Standard ASVORE quality assurance'],
          bn: ['আন্তর্জাতিক মানের নিখুঁত সেলাই', 'প্রিমিয়াম ফেব্রিক ও ফিনিশিং']
        },
        sizes: sizesArray.length > 0 ? sizesArray : undefined,
        specifications: { 'Origin': 'Bangladesh Atelier', 'Fit': 'Custom Tailored' },
        rating: 5.0,
        reviewCount: 1,
        isFeatured: prodIsFeatured,
        isBestSeller: prodIsBestSeller,
        isNewArrival: prodIsNewArrival,
        isDemo: false,
      });
    }

    setProductModalOpen(false);
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    addCoupon({
      code: couponCode.trim().toUpperCase(),
      type: couponType,
      value: Number(couponValue),
      minSpend: Number(couponMinSpend),
      expiryDate: couponExpiry,
      isActive: true,
    });

    setCouponModalOpen(false);
    setCouponCode('');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div className="bg-[#171717] text-stone-200 min-h-screen">
      
      {/* Top Admin Navigation Header */}
      <header className="border-b border-stone-800 bg-[#121212] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveView('home')}
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View Storefront</span>
          </button>
          <div className="h-4 w-px bg-stone-800" />
          <span className="font-serif-luxury font-bold tracking-widest text-[#C4A77D] text-sm uppercase">
            ASVORE · Admin Console
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs rounded transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-800 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
              activeTab === 'overview' ? 'bg-[#C4A77D] text-[#171717]' : 'text-stone-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
              activeTab === 'products' ? 'bg-[#C4A77D] text-[#171717]' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
              activeTab === 'orders' ? 'bg-[#C4A77D] text-[#171717]' : 'text-stone-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders & Dispatch ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
              activeTab === 'coupons' ? 'bg-[#C4A77D] text-[#171717]' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Coupons & Promos ({coupons.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
              activeTab === 'settings' ? 'bg-[#C4A77D] text-[#171717]' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Store Settings & Delivery</span>
          </button>
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-[#1E1E1E] rounded border border-stone-800">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block mb-1">
                  Total Store Revenue
                </span>
                <span className="text-2xl font-bold font-mono text-white">
                  {formatPrice(totalRevenue)}
                </span>
                <span className="text-[10px] text-stone-500 block mt-1">Confirmed & collected</span>
              </div>

              <div className="p-5 bg-[#1E1E1E] rounded border border-stone-800">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block mb-1">
                  Active Orders
                </span>
                <span className="text-2xl font-bold font-mono text-white">
                  {orders.length}
                </span>
                <span className="text-[10px] text-amber-400 block mt-1">{pendingOrders} awaiting fulfillment</span>
              </div>

              <div className="p-5 bg-[#1E1E1E] rounded border border-stone-800">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block mb-1">
                  Total Products
                </span>
                <span className="text-2xl font-bold font-mono text-white">
                  {products.length}
                </span>
                <span className="text-[10px] text-stone-500 block mt-1">Across 9 fashion categories</span>
              </div>

              <div className="p-5 bg-[#1E1E1E] rounded border border-stone-800">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block mb-1">
                  Low Stock Alert
                </span>
                <span className="text-2xl font-bold font-mono text-rose-400">
                  {lowStockProducts.length}
                </span>
                <span className="text-[10px] text-stone-500 block mt-1">Fewer than 5 items remaining</span>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-[#1E1E1E] p-6 rounded border border-stone-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif-luxury text-lg font-bold text-white">
                  Recent Orders
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-[#C4A77D] hover:underline"
                >
                  View All Orders &rarr;
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-stone-300">
                  <thead className="bg-stone-900/60 uppercase tracking-wider text-[10px] text-stone-400 border-b border-stone-800">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">District</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800 font-mono">
                    {orders.slice(0, 5).map(order => (
                      <tr key={order.id} className="hover:bg-stone-800/40">
                        <td className="py-3 px-4 font-bold text-white">#{order.orderNumber}</td>
                        <td className="py-3 px-4 font-sans text-stone-200">{order.customer.fullName}</td>
                        <td className="py-3 px-4 font-sans text-stone-400">{order.customer.district}</td>
                        <td className="py-3 px-4 text-white font-bold">{formatPrice(order.total)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            order.paymentStatus === 'Paid' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-amber-900/40 text-amber-300'
                          }`}>
                            {order.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-sans">
                          <span className="px-2 py-0.5 bg-stone-800 text-stone-200 rounded text-[10px] uppercase font-semibold">
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  Catalog & Inventory Management
                </h3>
                <p className="text-xs text-stone-400">
                  Manage product details, pricing in BDT, inventory counts, and category tags.
                </p>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C4A77D] hover:bg-[#b0946b] text-[#171717] text-xs font-bold uppercase tracking-wider rounded"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-400">Inventory Status:</span>
              <span className="text-xs font-mono bg-stone-900 px-2 py-1 rounded text-stone-300">
                {products.filter(p => p.isDemo).length} Demo Styles · {products.filter(p => !p.isDemo).length} Custom Live
              </span>
            </div>

            {/* Product Table */}
            <div className="bg-[#1E1E1E] rounded border border-stone-800 overflow-x-auto">
              <table className="w-full text-xs text-left text-stone-300">
                <thead className="bg-stone-900/60 uppercase tracking-wider text-[10px] text-stone-400 border-b border-stone-800">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4">Data Type</th>
                    <th className="py-3 px-4">Flags</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-stone-800/40">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img 
                          src={p.images[0]} 
                          alt={p.name.en} 
                          className="w-10 h-12 object-cover rounded border border-stone-700" 
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-semibold text-white">{p.name.en}</p>
                          <span className="font-mono text-[10px] text-stone-500">SKU: {p.sku}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-stone-400">{p.category}</td>
                      <td className="py-3 px-4 font-mono font-bold text-white">
                        {formatPrice(p.salePrice || p.price)}
                        {p.salePrice && <span className="text-[10px] text-stone-500 line-through ml-1.5">{formatPrice(p.price)}</span>}
                      </td>
                      <td className="py-3 px-4 font-mono">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          p.stock <= 5 ? 'bg-rose-900/40 text-rose-300' : 'bg-emerald-900/40 text-emerald-300'
                        }`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {p.isDemo ? (
                          <span className="bg-amber-900/50 text-amber-300 border border-amber-700/60 px-2 py-0.5 rounded text-[10px] font-mono font-semibold">
                            DEMO DATA
                          </span>
                        ) : (
                          <span className="bg-emerald-900/50 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded text-[10px] font-mono font-semibold">
                            LIVE INVENTORY
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-[10px] space-x-1">
                        {p.isFeatured && <span className="bg-amber-900/40 text-amber-300 px-1.5 py-0.5 rounded">Featured</span>}
                        {p.isBestSeller && <span className="bg-purple-900/40 text-purple-300 px-1.5 py-0.5 rounded">Best Seller</span>}
                        {p.isNewArrival && <span className="bg-blue-900/40 text-blue-300 px-1.5 py-0.5 rounded">New</span>}
                        {p.isTrending && <span className="bg-stone-700 text-[#C4A77D] px-1.5 py-0.5 rounded">Trending</span>}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditProduct(p)}
                          className="p-1.5 text-stone-400 hover:text-[#C4A77D]"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${p.name.en}?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-stone-400 hover:text-rose-400"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                Orders & Courier Dispatch
              </h3>
              <p className="text-xs text-stone-400">
                Update fulfillment stages, courier tracking codes, and payment verifications.
              </p>
            </div>

            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="p-5 bg-[#1E1E1E] rounded border border-stone-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white text-base">#{order.orderNumber}</span>
                        <span className="text-xs text-stone-400">({order.customer.fullName} · {order.customer.phone})</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {order.customer.address}, {order.customer.district}, {order.customer.division}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {/* Status Selector */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-stone-400">Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="bg-stone-900 border border-stone-700 text-xs rounded px-2.5 py-1 text-white focus:outline-none focus:border-[#C4A77D]"
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Order Confirmed">Order Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Returned">Returned</option>
                        </select>
                      </div>

                      {/* Payment Status */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] text-stone-400">Payment:</span>
                        <select
                          value={order.paymentStatus}
                          onChange={(e) => updateOrderPaymentStatus(order.id, e.target.value as PaymentStatus)}
                          className="bg-stone-900 border border-stone-700 text-xs rounded px-2.5 py-1 text-white focus:outline-none focus:border-[#C4A77D]"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Paid">Paid</option>
                          <option value="Failed">Failed</option>
                          <option value="Refunded">Refunded</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center gap-2.5 p-2 bg-stone-900/40 rounded border border-stone-800">
                        <img src={item.image} alt={item.name.en} className="w-8 h-10 object-cover rounded" referrerPolicy="no-referrer" />
                        <div className="truncate flex-1">
                          <p className="font-semibold text-stone-200 truncate">{item.name.en}</p>
                          <p className="text-[10px] text-stone-500">Qty: {item.quantity} {item.size ? `· Size ${item.size}` : ''}</p>
                        </div>
                        <span className="font-mono text-stone-300">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Summary & Notes */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-800/60">
                    <div>
                      {order.customer.notes && (
                        <span>Instructions: <strong className="text-stone-300">{order.customer.notes}</strong></span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 font-mono font-bold text-white">
                      <span>Total: {formatPrice(order.total)}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. COUPONS TAB */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  Discount Coupons
                </h3>
                <p className="text-xs text-stone-400">
                  Create and manage percentage and fixed-amount checkout coupon codes.
                </p>
              </div>

              <button
                onClick={() => setCouponModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#C4A77D] hover:bg-[#b0946b] text-[#171717] text-xs font-bold uppercase tracking-wider rounded"
              >
                <Plus className="w-4 h-4" />
                <span>Create Coupon</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {coupons.map(coupon => (
                <div key={coupon.id} className="p-5 bg-[#1E1E1E] rounded border border-stone-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-bold text-lg text-[#C4A77D] tracking-wider">
                        {coupon.code}
                      </span>
                      <button
                        onClick={() => deleteCoupon(coupon.id)}
                        className="text-stone-500 hover:text-rose-400"
                        title="Delete Coupon"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-stone-300 font-semibold mb-1">
                      {coupon.type === 'percentage' ? `${coupon.value}% Discount` : `${formatPrice(coupon.value)} Flat Discount`}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Minimum spend: {formatPrice(coupon.minSpend || 0)}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Expires: {coupon.expiryDate}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
                    <span>Used {coupon.usageCount} times</span>
                    <span className="text-emerald-400 font-semibold">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. STORE SETTINGS & DELIVERY */}
        {activeTab === 'settings' && (
          <div className="bg-[#1E1E1E] p-6 sm:p-8 rounded border border-stone-800 max-w-2xl space-y-6">
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                Store Settings & Delivery Configuration
              </h3>
              <p className="text-xs text-stone-400">
                Adjust Bangladesh nationwide shipping fees, free delivery threshold, and showroom contact details.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Inside Dhaka Fee (৳)</label>
                  <input
                    type="number"
                    value={settingsForm.deliveryInsideDhaka}
                    onChange={(e) => setSettingsForm({ ...settingsForm, deliveryInsideDhaka: Number(e.target.value) })}
                    className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Outside Dhaka Fee (৳)</label>
                  <input
                    type="number"
                    value={settingsForm.deliveryOutsideDhaka}
                    onChange={(e) => setSettingsForm({ ...settingsForm, deliveryOutsideDhaka: Number(e.target.value) })}
                    className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Free Shipping Threshold (৳)</label>
                  <input
                    type="number"
                    value={settingsForm.freeDeliveryThreshold}
                    onChange={(e) => setSettingsForm({ ...settingsForm, freeDeliveryThreshold: Number(e.target.value) })}
                    className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Top Announcement (English)</label>
                <input
                  type="text"
                  value={settingsForm.announcementText.en}
                  onChange={(e) => setSettingsForm({ 
                    ...settingsForm, 
                    announcementText: { ...settingsForm.announcementText, en: e.target.value } 
                  })}
                  className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Top Announcement (Bangla)</label>
                <input
                  type="text"
                  value={settingsForm.announcementText.bn}
                  onChange={(e) => setSettingsForm({ 
                    ...settingsForm, 
                    announcementText: { ...settingsForm.announcementText, bn: e.target.value } 
                  })}
                  className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">WhatsApp & Call Contact</label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value, whatsappNumber: e.target.value })}
                    className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Support Email</label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Official Showroom Address</label>
                <input
                  type="text"
                  value={settingsForm.showroomAddress.en}
                  onChange={(e) => setSettingsForm({ 
                    ...settingsForm, 
                    showroomAddress: { ...settingsForm.showroomAddress, en: e.target.value } 
                  })}
                  className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>

              <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                <span className="text-[11px] text-stone-500">Changes apply immediately across all client sessions.</span>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C4A77D] hover:bg-[#b0946b] text-[#171717] font-bold uppercase tracking-wider rounded flex items-center gap-2"
                >
                  <span>Save Configuration</span>
                  {settingsSaved && <Check className="w-4 h-4 text-emerald-800" />}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>

      {/* Add / Edit Product Modal */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative bg-[#1E1E1E] text-stone-200 rounded-lg max-w-xl w-full p-6 shadow-2xl border border-stone-800 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setProductModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-luxury text-xl font-bold text-white mb-4">
              {editingProductId ? 'Edit Product' : 'Add New Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={prodNameEn}
                    onChange={(e) => setProdNameEn(e.target.value)}
                    placeholder="e.g. Royal Oxford Shirt"
                    className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Name (Bangla)</label>
                  <input
                    type="text"
                    value={prodNameBn}
                    onChange={(e) => setProdNameBn(e.target.value)}
                    placeholder="e.g. রয়্যাল অক্সফোর্ড শার্ট"
                    className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Category *</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value as Category)}
                    className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white"
                  >
                    {[
                      'Panjabis', 'Shirts', 'T-Shirts', 'Trousers',
                      'Watches', 'Belts', 'Wallets', 'Sunglasses', 'Perfumes'
                    ].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Regular Price (৳) *</label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Sale Price (৳)</label>
                  <input
                    type="number"
                    value={prodSalePrice || ''}
                    onChange={(e) => setProdSalePrice(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Optional"
                    className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Sizes (Comma separated)</label>
                  <input
                    type="text"
                    value={prodSizes}
                    onChange={(e) => setProdSizes(e.target.value)}
                    placeholder="M, L, XL, XXL or 30, 32, 34"
                    className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Description (English)</label>
                <textarea
                  rows={2}
                  value={prodDescEn}
                  onChange={(e) => setProdDescEn(e.target.value)}
                  className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodIsFeatured}
                    onChange={(e) => setProdIsFeatured(e.target.checked)}
                    className="accent-[#C4A77D]"
                  />
                  <span>Featured Product</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodIsBestSeller}
                    onChange={(e) => setProdIsBestSeller(e.target.checked)}
                    className="accent-[#C4A77D]"
                  />
                  <span>Best Seller</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodIsNewArrival}
                    onChange={(e) => setProdIsNewArrival(e.target.checked)}
                    className="accent-[#C4A77D]"
                  />
                  <span>New Arrival</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C4A77D] hover:bg-[#b0946b] text-[#171717] font-bold uppercase tracking-wider rounded"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Coupon Modal */}
      {couponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative bg-[#1E1E1E] text-stone-200 rounded-lg max-w-sm w-full p-6 shadow-2xl border border-stone-800">
            <button
              onClick={() => setCouponModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-luxury text-xl font-bold text-white mb-4">
              Create Coupon
            </h3>

            <form onSubmit={handleSaveCoupon} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g. VIP20"
                  className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white font-mono uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Type</label>
                  <select
                    value={couponType}
                    onChange={(e) => setCouponType(e.target.value as any)}
                    className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed (৳ BDT)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-300 font-semibold mb-1">Value *</label>
                  <input
                    type="number"
                    required
                    value={couponValue}
                    onChange={(e) => setCouponValue(Number(e.target.value))}
                    className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Min Spend (৳)</label>
                <input
                  type="number"
                  value={couponMinSpend}
                  onChange={(e) => setCouponMinSpend(Number(e.target.value))}
                  className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-semibold mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={couponExpiry}
                  onChange={(e) => setCouponExpiry(e.target.value)}
                  className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded text-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setCouponModalOpen(false)}
                  className="px-4 py-2 text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C4A77D] hover:bg-[#b0946b] text-[#171717] font-bold uppercase tracking-wider rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
