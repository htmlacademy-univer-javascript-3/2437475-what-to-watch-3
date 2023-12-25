import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { AppRoute } from '../app';

export type PrivateRouteProps = {
    children: ReactNode;
}

export function PrivateRoute({children}: PrivateRouteProps) {
  const authorizationStatus = useSelector((state: AppState) => state.authorizationStatus);

  if (!authorizationStatus) {
    return <Navigate to={AppRoute.LoginPage} />;
  }

  return <div>{children}</div>;
}
