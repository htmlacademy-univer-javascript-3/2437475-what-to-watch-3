import {Link} from 'react-router-dom';
import { AppRoute } from '../app';

export function PageNotFound() {
  return (
    <div>
      <h1>404 Not Found :c</h1>
      <Link to={AppRoute.MainPage}>Go to Main Page</Link>
    </div>
  );
}
