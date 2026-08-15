"use client";

import dynamic from 'next/dynamic';

export const DynamicVelaris = dynamic(() => import('./velaris'), { ssr: false });
export const DynamicAurora = dynamic(() => import('./aurora-background'), { ssr: false });
