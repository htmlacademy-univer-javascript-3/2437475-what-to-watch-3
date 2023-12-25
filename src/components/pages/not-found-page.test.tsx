import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoute } from '../app';
import { PageNotFound } from './not-found-page';

describe('PageNotFound', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Router>
        <PageNotFound />
      </Router>
    );

    expect(getByText('404 Not Found :c')).toBeInTheDocument();
    expect(getByText('Oops! Looks like the page you\'re looking for does not exist.')).toBeInTheDocument();
    expect(getByText('Don\'t worry, you can always go back to the main page!')).toBeInTheDocument();
    expect(getByText('Main Page')).toBeInTheDocument();
  });

  it('renders the correct link', () => {
    const { getByText } = render(
      <Router>
        <PageNotFound />
      </Router>
    );

    const link = getByText('Main Page');
    expect(link.getAttribute('href')).toBe(AppRoute.Main);
  });
});
