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
    <div className="w-full max-w-sm mx-auto flex flex-col gap-2">
      {/* Numpad */}
      <div className="grid grid-cols-3 gap-2">
        {keys.flat().map((keyVal) => {
          if (keyVal === 'clear') {
            return (
              <button
                key={keyVal}
                disabled={disabled}
                onClick={() => { triggerHaptic(); onClear(); }}
                className="h-20 rounded-2xl bg-white border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-gray-50 text-gray-500 font-medium text-lg transition-colors flex items-center justify-center active:bg-gray-100"
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
              className="h-20 rounded-2xl bg-white border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-gray-50 text-gray-900 font-semibold text-3xl transition-colors flex items-center justify-center active:bg-gray-100"
            >
              {keyVal}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2">
        <button
          disabled={disabled}
          onClick={() => { triggerHaptic(); onBackspace(); }}
          className="h-20 w-[30%] shrink-0 rounded-2xl bg-white border border-gray-100 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-gray-50 text-gray-600 flex items-center justify-center transition-colors active:bg-gray-100"
        >
          <Delete className="w-7 h-7" />
        </button>
        <button
          disabled={disabled || !canCharge}
          onClick={() => { triggerHaptic(); onCharge(); }}
          className={`h-20 flex-1 rounded-2xl text-2xl font-bold transition-all shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] ${
            disabled || !canCharge 
              ? 'bg-blue-600/50 text-white/50 shadow-none'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
          }`}
        >
          Charge
        </button>
      </div>
    </div>
  );
};
