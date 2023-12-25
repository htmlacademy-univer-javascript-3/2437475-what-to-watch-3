import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './header';
import store from '../../store';
import { AppRoute } from '../app';

describe('Header component', () => {
  it('renders logo correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header authStatus />
        </MemoryRouter>
      </Provider>
    );

    const letterWElements = screen.queryAllByText('W');

    const logoLink = letterWElements[0]?.closest('.logo__link');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink?.getAttribute('href')).toBe(AppRoute.Main);

    letterWElements.forEach((letterW) => {
      expect(letterW).toBeInTheDocument();
    });

    const letterT = getByText('T');
    expect(letterT).toBeInTheDocument();
  });

  it('renders user avatar when authStatus is true', () => {
    const { getByAltText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header authStatus />
        </MemoryRouter>
      </Provider>
    );

    expect(getByAltText('user-avatar')).toBeInTheDocument();
  });

  it('renders "Sign out" link when authStatus is true', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header authStatus />
        </MemoryRouter>
      </Provider>
    );

    expect(getByText('Sign out')).toBeInTheDocument();
  });

  it('renders "Sign in" link when authStatus is false', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header authStatus={false} />
        </MemoryRouter>
      </Provider>
    );

    expect(getByText('Sign in')).toBeInTheDocument();
  });
});
