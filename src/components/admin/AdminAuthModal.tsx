import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, Lock, KeyRound } from 'lucide-react';

export const AdminAuthModal: React.FC = () => {
  const { isAdminAuthOpen, setIsAdminAuthOpen, loginAdmin, setActiveView } = useApp();
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAdminAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(pin)) {
      setIsAdminAuthOpen(false);
      setPin('');
      setErrorMsg('');
      setActiveView('admin');
    } else {
      setErrorMsg('Invalid Administrator Security PIN. (Default PIN: 1234)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="fixed inset-0"
        onClick={() => setIsAdminAuthOpen(false)}
      />

      <div className="relative bg-[#171717] text-white rounded-lg max-w-sm w-full p-6 sm:p-8 shadow-2xl border border-stone-800 z-10">
        <button
          onClick={() => setIsAdminAuthOpen(false)}
          className="absolute top-4 right-4 text-stone-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-stone-800 text-[#C4A77D] flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C4A77D] block mb-1">
            AUTHORIZED ACCESS ONLY
          </span>
          <h2 className="font-serif-luxury text-xl font-bold text-white">
            ASVORE Admin Console
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Enter the administrative security PIN to manage store inventory, orders, and content.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
              Security PIN
            </label>
            <input
              type="password"
              required
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setErrorMsg('');
              }}
              placeholder="••••"
              className="w-full text-center text-xl tracking-[0.4em] p-3 bg-stone-900 border border-stone-700 rounded font-mono text-white focus:outline-none focus:border-[#C4A77D]"
            />
            {errorMsg ? (
              <span className="text-[11px] text-rose-400 block text-center mt-1.5">{errorMsg}</span>
            ) : (
              <span className="text-[11px] text-stone-500 block text-center mt-1">
                Authorized test PIN: <strong className="text-stone-300 font-mono">1234</strong>
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#C4A77D] hover:bg-[#b0946b] text-[#171717] text-xs uppercase tracking-widest font-bold rounded flex items-center justify-center gap-2 transition-colors"
          >
            <KeyRound className="w-4 h-4" />
            <span>Authenticate Admin</span>
          </button>
        </form>

      </div>
    </div>
  );
};
