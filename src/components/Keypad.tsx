'use client';

import React from 'react';
import { Delete } from 'lucide-react';

interface KeypadProps {
  onKeyPress: (key: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  onCharge: () => void;
  disabled?: boolean;
  canCharge?: boolean;
}

export const Keypad: React.FC<KeypadProps> = ({
  onKeyPress,
  onClear,
  onBackspace,
  onCharge,
  disabled = false,
  canCharge = true,
}) => {
  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try { navigator.vibrate(10); } catch { /* ignore */ }
    }
  };

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', 'clear'],
  ];

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-3">
      {/* Numpad */}
      <div className="grid grid-cols-3 gap-3">
        {keys.flat().map((keyVal) => {
          if (keyVal === 'clear') {
            return (
              <button
                key={keyVal}
                disabled={disabled}
                onClick={() => { triggerHaptic(); onClear(); }}
                className="h-16 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold text-lg transition-colors flex items-center justify-center active:bg-gray-300"
              >
                Clear
              </button>
            );
          }
          return (
            <button
              key={keyVal}
              disabled={disabled}
              onClick={() => { triggerHaptic(); onKeyPress(keyVal); }}
              className="h-16 rounded-2xl bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-900 font-semibold text-2xl transition-colors flex items-center justify-center active:bg-gray-100"
            >
              {keyVal}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          disabled={disabled}
          onClick={() => { triggerHaptic(); onBackspace(); }}
          className="h-16 w-20 shrink-0 rounded-2xl bg-white border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-600 flex items-center justify-center transition-colors active:bg-gray-100"
        >
          <Delete className="w-6 h-6" />
        </button>
        <button
          disabled={disabled || !canCharge}
          onClick={() => { triggerHaptic(); onCharge(); }}
          className="h-16 flex-1 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl transition-all shadow-md active:bg-blue-800 disabled:opacity-50 disabled:shadow-none"
        >
          Charge
        </button>
      </div>
    </div>
  );
};
