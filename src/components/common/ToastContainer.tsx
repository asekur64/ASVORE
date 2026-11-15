import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map(toast => {
        let icon = <Info className="w-4 h-4 text-[#C4A77D] shrink-0" />;
        let borderClass = 'border-[#C4A77D]/40';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
          borderClass = 'border-emerald-500/30';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />;
          borderClass = 'border-rose-500/30';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 bg-[#171717] text-white text-xs sm:text-sm rounded shadow-xl border ${borderClass} animate-in fade-in slide-in-from-bottom-2 duration-200`}
          >
            <div className="mt-0.5">{icon}</div>
            <p className="flex-1 font-medium leading-snug">{toast.message}</p>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-stone-400 hover:text-white transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
