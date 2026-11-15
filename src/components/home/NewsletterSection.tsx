import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, Mail, AlertCircle, Shield } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { t, notify } = useApp();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'duplicate'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [subscribersCount, setSubscribersCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('asvore_subscribers');
      return saved ? JSON.parse(saved).length + 342 : 342;
    } catch {
      return 342;
    }
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!emailRegex.test(cleanEmail)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email format (e.g., name@domain.com).');
      return;
    }

    // Check duplicate in localStorage
    try {
      const saved = localStorage.getItem('asvore_subscribers');
      const list: string[] = saved ? JSON.parse(saved) : [];

      if (list.includes(cleanEmail)) {
        setStatus('duplicate');
        setErrorMessage('You are already subscribed to the ASVORE Club!');
        return;
      }

      list.push(cleanEmail);
      localStorage.setItem('asvore_subscribers', JSON.stringify(list));
      setSubscribersCount(list.length + 342);
      setStatus('success');
      setEmail('');
      notify('Welcome to ASVORE Club! Your 10% voucher code is: ASVORE10', 'success');
    } catch (err) {
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-[#E8E4DA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#A6885E] block mb-2">
          JOIN THE ASVORE CLUB
        </span>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-bold tracking-tight mb-3">
          {t('newsletterHeading')}
        </h2>
        <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto mb-6">
          {t('newsletterDesc')}
        </p>

        {status === 'success' ? (
          <div className="max-w-md mx-auto p-5 bg-emerald-50 border border-emerald-200 rounded-md text-left text-xs text-emerald-900 space-y-2 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Subscription Confirmed</span>
            </div>
            <p className="text-emerald-700">
              Thank you for subscribing! As a welcome gift, use code <strong className="font-mono bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-900">ASVORE10</strong> at checkout for 10% off your purchase.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="text-[11px] underline text-emerald-800 font-semibold"
            >
              Subscribe another email
            </button>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative w-full sm:flex-1">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  placeholder={t('newsletterPlaceholder')}
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded text-xs text-stone-900 focus:outline-none focus:border-[#C4A77D]"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-widest rounded transition-colors whitespace-nowrap shadow-xs"
              >
                {t('newsletterSubscribe')}
              </button>
            </form>

            {/* Error & Duplicate Alerts */}
            {(status === 'error' || status === 'duplicate') && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-rose-600 mt-2 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-stone-400">
              <Shield className="w-3 h-3 text-[#A6885E]" />
              <span>Subscribed by {subscribersCount.toLocaleString()} gentlemen. No spam, ever.</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
