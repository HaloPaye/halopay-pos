import React, { useState } from 'react';

interface KeypadProps {
  onInput: (value: string) => void;
  onGenerateQR: () => void;
}

export function Keypad({ onInput, onGenerateQR }: KeypadProps) {
  const [isDebouncing, setIsDebouncing] = useState(false);

  const handleGenerateClick = () => {
    if (isDebouncing) return;
    
    // Simulate haptic feedback on Android devices
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    setIsDebouncing(true);
    onGenerateQR();
    
    // 500ms debounce to prevent rapid double-taps causing rendering stutters
    setTimeout(() => {
      setIsDebouncing(false);
    }, 500);
  };

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-sm mx-auto p-4 bg-slate-900 rounded-2xl shadow-xl">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'C'].map((key) => (
        <button
          key={key}
          onClick={() => onInput(key.toString())}
          className="h-20 text-3xl font-bold text-slate-100 bg-slate-800 rounded-xl active:bg-emerald-500 active:text-slate-950 transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-500/50 flex items-center justify-center touch-manipulation"
          aria-label={`Keypad button ${key}`}
        >
          {key}
        </button>
      ))}
      <div className="col-span-3 mt-4">
        <button
          onClick={handleGenerateClick}
          disabled={isDebouncing}
          className={`w-full h-16 text-xl font-bold rounded-xl transition-all flex items-center justify-center ${
            isDebouncing 
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
              : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 active:scale-95 shadow-lg shadow-emerald-500/20'
          }`}
        >
          {isDebouncing ? 'Generating...' : 'Generate QR'}
        </button>
      </div>
    </div>
  );
}
