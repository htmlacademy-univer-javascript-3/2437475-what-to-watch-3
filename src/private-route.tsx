import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

export type PrivateRouteProps = {
    children: ReactNode;
}

export function PrivateRoute({}: PrivateRouteProps) {
  //const isAuthenticated = false;

  //if (!isAuthenticated) {
  return <Navigate to="/login" />;
  //}

  //return children;
}
