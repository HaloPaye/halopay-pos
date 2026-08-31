'use client';

import React, { useEffect } from 'react';

export function SuccessAnimation({ size = 24 }: { size?: number }) {
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        // Success haptic pattern
        navigator.vibrate([100, 50, 100, 50, 200]);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  return (
    <svg
      className="success-checkmark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      width={size}
      height={size}
    >
      <circle
        className="success-checkmark__circle"
        cx="26"
        cy="26"
        r="25"
        fill="none"
      />
      <path
        className="success-checkmark__check"
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
      <style>{`
        .success-checkmark {
          display: block;
        }
        .success-checkmark__circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          stroke-width: 2;
          stroke-miterlimit: 10;
          stroke: #10b981;
          fill: none;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .success-checkmark__check {
          transform-origin: 50% 50%;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          stroke: #10b981;
          stroke-width: 3;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.3s forwards;
        }
        @keyframes stroke {
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </svg>
  );
}
