import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Logo } from './logo';
import { AppRoute } from './app';

test('renders Logo component', () => {
  render(
    <BrowserRouter>
      <Logo />
    </BrowserRouter>
  );

  const letterWElements = screen.queryAllByText('W');

  const logoLink = letterWElements[0]?.closest('.logo__link');
  expect(logoLink).toBeInTheDocument();
  expect(logoLink?.getAttribute('href')).toBe(AppRoute.MainPage);

  letterWElements.forEach((letterW) => {
    expect(letterW).toBeInTheDocument();
  });

  const letterT = screen.getByText('T');
  expect(letterT).toBeInTheDocument();
});
