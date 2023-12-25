import { render, screen } from '@testing-library/react';
import { GenreList } from './genres-list';

test('renders genre list correctly', () => {
  const films = [
    { id: '1', name: 'Film 1', genre: 'Drama', image: '', video: ''},
    { id: '2', name: 'Film 2', genre: 'Comedy', image: '', video: '' },
    { id: '2', name: 'Film 2', genre: 'Horror', image: '', video: '' }
  ];
  let activeGenre = 'Drama';

  render(
    <GenreList
      films={films}
      activeGenre={activeGenre}
      onGenreChange={() => {
        activeGenre = 'Drama';
      }}
    />
  );

  const genreList = screen.getByRole('list');
  const genreItems = screen.getAllByRole('listitem');

  expect(genreList).toBeInTheDocument();
  expect(genreItems.length).toBe(4);

  const activeGenreItem = genreItems.find((item) =>
    item.classList.contains('catalog__genres-item--active')
  );
  expect(activeGenreItem).toBeInTheDocument();
});
