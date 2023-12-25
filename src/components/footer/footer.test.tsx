import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoute } from '../app';
import { Footer } from './footer';

describe('Footer', () => {
  it('renders correctly', () => {
    const { getByText, queryAllByText } = render(
      <Router>
        <Footer />
      </Router>
    );

    const letterWElements = queryAllByText('W');

    const logoLink = letterWElements[0]?.closest('.logo__link');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink?.getAttribute('href')).toBe(AppRoute.Main);

    letterWElements.forEach((letterW) => {
      expect(letterW).toBeInTheDocument();
    });

    const letterT = getByText('T');
    expect(letterT).toBeInTheDocument();

    const copyrightText = getByText(/2023 What to watch Ltd./i);
    expect(copyrightText).toBeInTheDocument();
  });
});
