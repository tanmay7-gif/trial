'use client';

import React from 'react';
import { MedVaultProvider } from '@/lib/context';

export function Providers({ children }: { children: React.ReactNode }) {
  return <MedVaultProvider>{children}</MedVaultProvider>;
}
