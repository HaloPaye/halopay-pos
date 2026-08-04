'use client';

import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { MerchantConfig, saveMerchantConfig } from '@/lib/storage';
import { validateStellarPublicKey } from '@/lib/qr-generator';

interface MerchantConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: MerchantConfig;
  onSave: (updated: MerchantConfig) => void;
}

export const MerchantConfigModal: React.FC<MerchantConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<MerchantConfig>(config);
  const [error, setError] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFormData(config);
    setError(null);
    setSavedSuccess(false);
  }, [config, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.merchantName.trim()) return setError('Merchant name is required');
    if (!validateStellarPublicKey(formData.publicKey)) return setError('Invalid Stellar Public Key format');

    const updated = saveMerchantConfig(formData);
    onSave(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-gray-900">Settings</h3>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Merchant Name</label>
            <input
              type="text"
              value={formData.merchantName}
              onChange={(e) => setFormData({ ...formData, merchantName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-shadow text-gray-900"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Stellar Public Key</label>
            <input
              type="text"
              value={formData.publicKey}
              onChange={(e) => setFormData({ ...formData, publicKey: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-shadow text-gray-900 font-mono text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Currency</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 outline-none text-gray-900"
              >
                <option value="XAF">XAF</option>
                <option value="NGN">NGN</option>
                <option value="KES">KES</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Asset</label>
              <input disabled value={formData.assetCode} className="w-full px-4 py-2.5 rounded-xl bg-gray-100 border border-gray-200 text-gray-500 font-semibold cursor-not-allowed" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">USDC Issuer</label>
            <input
              type="text"
              value={formData.assetIssuer}
              onChange={(e) => setFormData({ ...formData, assetIssuer: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-shadow text-gray-900 font-mono text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">WS URL</label>
            <input
              type="text"
              value={formData.wsUrl}
              onChange={(e) => setFormData({ ...formData, wsUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-shadow text-gray-900 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            {savedSuccess ? <><Check className="w-5 h-5" /> Saved</> : 'Save Configuration'}
          </button>
        </form>
      </div>
    </div>
  );
};
