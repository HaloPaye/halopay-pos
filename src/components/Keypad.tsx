'use client';

import React from 'react';
import { Delete, RotateCcw } from 'lucide-react';

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
      try {
        navigator.vibrate(15);
      } catch {
        // Ignore haptic errors if not supported
      }
    }
  };

  const handleKey = (val: string) => {
    if (disabled) return;
    triggerHaptic();
    onKeyPress(val);
  };

  const handleClear = () => {
    if (disabled) return;
    triggerHaptic();
    onClear();
  };

  const handleBackspace = () => {
    if (disabled) return;
    triggerHaptic();
    onBackspace();
  };

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '00'],
  ];

  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-3 p-2 select-none">
      {/* Keypad Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {keys.flat().map((keyVal) => (
          <button
            key={keyVal}
            type="button"
            disabled={disabled}
            onClick={() => handleKey(keyVal)}
            className="h-16 sm:h-20 rounded-2xl bg-slate-900/80 hover:bg-slate-800 active:bg-cyan-500/20 text-slate-100 active:text-cyan-400 font-bold text-2xl sm:text-3xl transition-all duration-150 shadow-md border border-slate-800/80 active:scale-95 flex items-center justify-center disabled:opacity-50"
            aria-label={`Key ${keyVal}`}
          >
            {keyVal}
          </button>
        ))}
      </div>

      {/* Action Controls Row */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <button
          type="button"
          disabled={disabled}
          onClick={handleClear}
          className="h-14 sm:h-16 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 font-semibold text-lg transition-all duration-150 border border-rose-900/50 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          aria-label="Clear Amount"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Clear</span>
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={handleBackspace}
          className="h-14 sm:h-16 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-semibold text-lg transition-all duration-150 border border-slate-800 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          aria-label="Backspace"
        >
          <Delete className="w-5 h-5" />
          <span>Backspace</span>
        </button>
      </div>

      {/* Large Touch Target Charge Button */}
      <button
        type="button"
        disabled={disabled || !canCharge}
        onClick={() => {
          triggerHaptic();
          onCharge();
        }}
        className="w-full h-16 sm:h-20 mt-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 active:scale-[0.98] text-slate-950 font-extrabold text-xl sm:text-2xl shadow-lg shadow-cyan-500/20 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
      >
        <span>Generate Payment QR</span>
        <span className="bg-slate-950/20 px-3 py-1 rounded-lg text-sm text-slate-950">SEP-0007</span>
      </button>
    </div>
  );
};
