import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SignInLink } from './sign-in-link';
import { AppRoute } from '../../app';

test('renders SignInLink component', () => {
  render(
    <BrowserRouter>
      <SignInLink />
    </BrowserRouter>
  );

  const linkElement = screen.getByRole('link', { name: /sign in/i });
  expect(linkElement).toBeInTheDocument();

  expect(linkElement).toHaveAttribute('href', AppRoute.LoginPage);
});
