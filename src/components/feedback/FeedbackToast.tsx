import React, { useEffect } from 'react';

export interface FeedbackToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  visible: boolean;
  onDismiss?: () => void;
  durationMs?: number;
}

export const FeedbackToast: React.FC<FeedbackToastProps> = ({
  message,
  type = 'info',
  visible,
  onDismiss,
  durationMs = 3000,
}) => {
  useEffect(() => {
    if (visible && onDismiss && durationMs > 0) {
      const timer = setTimeout(() => {
        onDismiss();
      }, durationMs);
      return () => clearTimeout(timer);
    }
  }, [visible, onDismiss, durationMs]);

  if (!visible) return null;

  const bgStyles = {
    success: 'bg-emerald-900/90 border-emerald-500 text-emerald-100',
    error: 'bg-rose-900/90 border-rose-500 text-rose-100',
    info: 'bg-slate-900/90 border-cyan-500 text-cyan-100',
  }[type];

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="feedback-toast"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 transform translate-y-0 ${bgStyles}`}
    >
      <span className="text-sm font-medium">{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-2 text-xs opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      )}
    </div>
  );
};
