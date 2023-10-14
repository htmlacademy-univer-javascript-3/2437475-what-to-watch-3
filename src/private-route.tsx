import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

export type PrivateRouteProps = {
    children: ReactNode;
}

export function PrivateRoute({children}: PrivateRouteProps) {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  children = '2'; //Заглушка. Git ругался, лучше не придумала

  return <Navigate to="/" />; //Заглушка. Git ругался, лучше не придумала
}
