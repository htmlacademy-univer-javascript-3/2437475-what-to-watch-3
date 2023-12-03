import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store/reducer';

export type PrivateRouteProps = {
    children: ReactNode;
}

export function PrivateRoute({children}: PrivateRouteProps) {
  const authorizationStatus = useSelector((state: AppState) => state.authorizationStatus);

  if (!authorizationStatus) {
    return <Navigate to="/login" />;
  }

  return <div>{children}</div>;
}
