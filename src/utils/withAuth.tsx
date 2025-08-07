// src/utils/withAuth.tsx
import ProtectedRoute from '@/components/ProtectedRoute';
import type { ReactElement } from 'react';

export function withAuth(component: ReactElement) {
  return <ProtectedRoute>{component}</ProtectedRoute>;
}
