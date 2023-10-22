import {Link} from 'react-router-dom';

export function PageNotFound() {
  return (
    <div>
      <h1>404 Not Found :c</h1>
      <Link to="/">Go to Main Page</Link>
    </div>
  );
}
