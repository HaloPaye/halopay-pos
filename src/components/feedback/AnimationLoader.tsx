import React from 'react';

export interface AnimationLoaderProps {
  status: 'idle' | 'loading' | 'success' | 'error';
  size?: number;
}

export const AnimationLoader: React.FC<AnimationLoaderProps> = ({ status, size = 48 }) => {
  if (status === 'idle') return null;

  return (
    <div
      data-testid="animation-loader"
      style={{ width: size, height: size }}
      className="relative flex items-center justify-center"
    >
      {status === 'loading' && (
        <svg className="animate-spin text-cyan-400" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {status === 'success' && (
        <svg className="text-emerald-400 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
      {status === 'error' && (
        <svg className="text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
    </div>
  );
};
