// src/components/ProtectedRoute.tsx
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import type { ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

export default function ProtectedRoute({ children }: Props) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/app-pope/login" state={{ from: location }} replace />;
}
