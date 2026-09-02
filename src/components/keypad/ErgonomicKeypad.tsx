import React from 'react';

export interface KeypadProps {
  onKeyPress: (key: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export const ErgonomicKeypad: React.FC<KeypadProps> = ({
  onKeyPress,
  onClear,
  onSubmit,
  disabled = false,
}) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'];

  return (
    <div className="grid grid-cols-3 gap-3 p-4 bg-slate-900 rounded-2xl shadow-xl border border-slate-800">
      {keys.map((k) => (
        <button
          key={k}
          type="button"
          disabled={disabled}
          onClick={() => (k === '⌫' ? onClear() : onKeyPress(k))}
          className="h-16 text-2xl font-bold rounded-xl bg-slate-800 text-white hover:bg-slate-700 active:scale-95 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {k}
        </button>
      ))}
      <button
        type="button"
        disabled={disabled}
        onClick={onSubmit}
        className="col-span-3 h-14 mt-2 text-lg font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg active:scale-98 transition-all"
      >
        Confirm Charge
      </button>
    </div>
  );
};
