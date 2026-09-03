import React, { useState, useCallback } from 'react';

export interface QRScannerProps {
  onScan: (data: string) => void;
  onError?: (err: Error) => void;
  isActive?: boolean;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onError, isActive = true }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const handleManualInput = useCallback((payload: string) => {
    if (payload && payload.trim().length > 0) {
      onScan(payload.trim());
    }
  }, [onScan]);

  return (
    <div className="relative w-full max-w-md mx-auto p-4 rounded-xl border border-neutral-800 bg-neutral-900/60 text-white">
      <div className="text-center font-medium text-sm mb-2">
        {isActive ? 'Scan Stellar Payment QR' : 'Scanner Inactive'}
      </div>
      <div className="h-48 bg-neutral-950 rounded-lg flex items-center justify-center border border-dashed border-neutral-700">
        <span className="text-xs text-neutral-400">Camera Viewfinder Ready</span>
      </div>
      <div className="mt-3">
        <input
          type="text"
          placeholder="Or paste QR payload manually"
          className="w-full px-3 py-1.5 text-xs bg-neutral-950 border border-neutral-800 rounded-md text-white focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleManualInput((e.target as HTMLInputElement).value);
            }
          }}
        />
      </div>
    </div>
  );
};