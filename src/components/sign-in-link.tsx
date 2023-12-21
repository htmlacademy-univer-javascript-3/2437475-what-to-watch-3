import { Link } from 'react-router-dom';
import { AppRoute } from './app';

export function SignInLink() {
  return(
    <Link to={AppRoute.LoginPage} className="user-block__link">
              Sign in
    </Link>
  );
}
