"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const VelarisComponent = dynamic(() => import('./velaris'), { ssr: false });
const AuroraComponent = dynamic(() => import('./aurora-background'), { ssr: false });

export const DynamicVelaris = (props: any) => {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);
  if (!isDesktop) return null;
  return <VelarisComponent {...props} />;
};

export const DynamicAurora = (props: any) => {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);
  if (!isDesktop) return null;
  return <AuroraComponent {...props} />;
};
