import {Link} from 'react-router-dom';
import { AppRoute } from '../app';
import './not-found.css';

export function PageNotFound() {
  return (
    <div className="not-found-page">
      <h1 data-testid="hidden-test-error-page" className="not-found-title">404 Not Found :c</h1>
      <p className="not-found-text">Oops! Looks like the page you&apos;re looking for does not exist.</p>
      <p className="not-found-text">Don&apos;t worry, you can always go back to the main page!</p>
      <Link to={AppRoute.MainPage} className="not-found-link">Main Page</Link>
    </div>
  );
}
