"use client";

import React, { useEffect, useState } from 'react';

export default function SplashOverlay() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay to ensure WebGL and heavy components are painted
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-[10000] bg-[#3b82f6] pointer-events-none transition-opacity duration-500 ${mounted ? 'opacity-0' : 'opacity-100'}`}
    />
  );
}
