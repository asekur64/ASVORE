import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { CategoryShowcase } from './components/home/CategoryShowcase';
import { FeaturedSection } from './components/home/FeaturedSection';
import { PromotionalBanner } from './components/home/PromotionalBanner';
import { BrandStory } from './components/home/BrandStory';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { CustomerReviewsSection } from './components/home/CustomerReviewsSection';
import { NewsletterSection } from './components/home/NewsletterSection';
import { ExclusiveCollections } from './components/home/ExclusiveCollections';
import { DeliveryReturnStrip } from './components/home/DeliveryReturnStrip';
import { CatalogPage } from './components/catalog/CatalogPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderTrackingPage } from './components/tracking/OrderTrackingPage';
import { CustomerAccountPage } from './components/account/CustomerAccountPage';
import { AboutPage, ContactPage, PoliciesPage } from './components/pages/StaticPages';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CartDrawer } from './components/cart/CartDrawer';
import { ProductQuickViewModal } from './components/product/ProductQuickViewModal';
import { AuthModal } from './components/auth/AuthModal';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { ToastContainer } from './components/common/ToastContainer';
import { WhatsAppFloating } from './components/common/WhatsAppFloating';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ASVORE Runtime Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FBF9F5] text-[#171717] flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white p-8 rounded-lg border border-[#E8E4DA] shadow-sm space-y-4">
            <h1 className="font-serif-luxury text-2xl font-bold">ASVORE</h1>
            <p className="text-sm text-stone-600">
              Something went wrong while loading the storefront. Please reset cached session data and reload.
            </p>
            <button
              onClick={() => {
                try {
                  localStorage.clear();
                } catch {
                  // ignore
                }
                window.location.reload();
              }}
              className="px-6 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold rounded"
            >
              Reset & Reload Storefront
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const MainLayout: React.FC = () => {
  const { activeView, isAdminAuthenticated } = useApp();

  // If activeView is 'admin' and user is authenticated as admin, render full dashboard
  if (activeView === 'admin' && isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#171717] text-stone-200">
        <AdminDashboard />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#171717]">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Header with 3-Zone Navigation */}
      <Header />

      {/* 3. Main Content Views */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            <Hero />
            <CategoryShowcase />
            <FeaturedSection />
            <ExclusiveCollections />
            <DeliveryReturnStrip />
            <PromotionalBanner />
            <BrandStory />
            <WhyChooseUs />
            <CustomerReviewsSection />
            <NewsletterSection />
          </>
        )}

        {activeView === 'catalog' && <CatalogPage />}
        {activeView === 'product' && <ProductDetailPage />}
        {activeView === 'checkout' && <CheckoutPage />}
        {activeView === 'account' && <CustomerAccountPage />}
        {activeView === 'track' && <OrderTrackingPage />}
        {activeView === 'about' && <AboutPage />}
        {activeView === 'contact' && <ContactPage />}
        {activeView === 'policies' && <PoliciesPage />}
      </main>

      {/* 4. Luxury Footer */}
      <Footer />

      {/* 5. Drawers, Modals & Floating Widgets */}
      <CartDrawer />
      <ProductQuickViewModal />
      <AuthModal />
      <AdminAuthModal />
      <ToastContainer />
      <WhatsAppFloating />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </ErrorBoundary>
  );
}
