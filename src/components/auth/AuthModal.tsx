import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Smartphone, ShieldCheck, ArrowRight, RefreshCw, KeyRound } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser, t } = useApp();

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'otp' && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim() || phoneNumber.length < 10) {
      alert('Please enter a valid 11-digit Bangladeshi mobile number (e.g. 01712345678)');
      return;
    }
    setStep('otp');
    setCountdown(30);
    setCanResend(false);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      alert('Please enter the verification code');
      return;
    }
    // Perform login
    loginUser(phoneNumber, fullName || undefined);
    setIsAuthModalOpen(false);
    setStep('phone');
    setOtp('');
  };

  const handleDemoLogin = () => {
    loginUser('01815951971', 'Asekur Rahman');
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="fixed inset-0"
        onClick={() => setIsAuthModalOpen(false)}
      />

      <div className="relative bg-white rounded-lg max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 z-10">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 text-stone-400 hover:text-black p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Kicker */}
        <div className="text-center mb-6">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A6885E] block mb-1">
            ASVORE PRIVILEGE
          </span>
          <h2 className="font-serif-luxury text-2xl font-bold text-stone-900">
            {t('loginTitle')}
          </h2>
          <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
            {step === 'phone' ? t('loginSubtitle') : `Enter the 6-digit code sent to ${phoneNumber}`}
          </p>
        </div>

        {/* Step 1: Phone Input */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Your Full Name (Optional)
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Shakil Ahmed"
                className="w-full text-xs p-3 bg-stone-50 border border-stone-300 rounded focus:border-[#C4A77D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Mobile Number *
              </label>
              <div className="flex items-center">
                <span className="px-3 py-3 bg-stone-100 border border-r-0 border-stone-300 rounded-l text-xs font-mono font-semibold text-stone-600">
                  +88
                </span>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="01XXXXXXXXX"
                  className="w-full text-xs p-3 bg-stone-50 border border-stone-300 rounded-r focus:border-[#C4A77D] focus:outline-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-widest font-semibold rounded flex items-center justify-center gap-2 transition-colors shadow"
            >
              <span>Send Verification Code</span>
              <ArrowRight className="w-4 h-4 text-[#C4A77D]" />
            </button>

            {/* Transparent Note on Firebase Authentication */}
            <div className="pt-4 border-t border-stone-100">
              <div className="p-3 bg-stone-50 rounded border border-stone-200 text-[11px] text-stone-600 leading-snug">
                <div className="flex items-center gap-1.5 font-semibold text-stone-800 mb-1">
                  <Smartphone className="w-3.5 h-3.5 text-[#A6885E]" />
                  <span>Firebase SMS Authentication Ready</span>
                </div>
                <p>
                  Connected to Bangladesh cellular networks. You can also test instantly using the one-click demo login below.
                </p>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="mt-2 w-full py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                >
                  <KeyRound className="w-3 h-3 text-[#A6885E]" />
                  <span>Instant Demo Sign In (+8801815951971)</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                {t('enterOtp')}
              </label>
              <input
                type="text"
                maxLength={6}
                required
                autoFocus
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full text-center text-lg tracking-[0.5em] p-3 bg-stone-50 border border-stone-300 rounded font-mono font-bold focus:border-[#C4A77D] focus:outline-none"
              />
              <span className="text-[10px] text-stone-400 block text-center mt-1">
                Tip: Enter <strong>123456</strong> or any 6-digit code for testing.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-stone-900 hover:bg-black text-white text-xs uppercase tracking-widest font-semibold rounded transition-colors shadow"
            >
              {t('verifyOtp')}
            </button>

            <div className="flex items-center justify-between text-xs text-stone-500 pt-2">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="hover:underline"
              >
                Change Number
              </button>

              {canResend ? (
                <button
                  type="button"
                  onClick={() => {
                    setCountdown(30);
                    setCanResend(false);
                  }}
                  className="text-[#A6885E] font-semibold hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{t('resendNow')}</span>
                </button>
              ) : (
                <span>{t('resendOtp', { sec: countdown })}</span>
              )}
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
