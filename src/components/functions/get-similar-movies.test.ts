import { getSimilarMovies, SIMILAR_FILM_COUNT } from "./get-similar-movies";

describe('getSimilarMovies', () => {
  const films = [
    { id: '1', name: 'Film 1', image: 'film1.jpg', video: 'film1.mp4', genre: 'Драма' },
    { id: '2', name: 'Film 2', image: 'film2.jpg', video: 'film2.mp4', genre: 'Ужасы' },
    { id: '3', name: 'Film 3', image: 'film3.jpg', video: 'film3.mp4', genre: 'Комедия' },
    { id: '4', name: 'Film 4', image: 'film4.jpg', video: 'film4.mp4', genre: 'Драма' }
  ];
  const genre = 'Ужасы';
  const filmId = '1';

  it('should return an array of similar films with the specified genre and without the film with the specified id', () => {
    const result = getSimilarMovies({genre, filmId, films});
    const expected = [
      { id: '2', name: 'Film 2', image: 'film2.jpg', video: 'film2.mp4', genre: 'Ужасы' }
    ];
    expect(result).toEqual(expected);
  });

  it('should return an array of similar films with the specified genre and without the film with the specified id, limited to SIMILAR_FILM_COUNT', () => {
    const additionalFilms = [
      { id: '5', name: 'Film 5', image: 'film5.jpg', video: 'film5.mp4', genre: 'Ужасы' },
      { id: '6', name: 'Film 6', image: 'film6.jpg', video: 'film6.mp4', genre: 'Ужасы' },
      { id: '7', name: 'Film 5', image: 'film5.jpg', video: 'film5.mp4', genre: 'Ужасы' },
      { id: '8', name: 'Film 6', image: 'film6.jpg', video: 'film6.mp4', genre: 'Ужасы' }
    ];
    const allFilms = [...films, ...additionalFilms];
    const result = getSimilarMovies({genre, filmId, films: allFilms});
    const expected = [
      { id: '2', name: 'Film 2', image: 'film2.jpg', video: 'film2.mp4', genre: 'Ужасы' },
      { id: '5', name: 'Film 5', image: 'film5.jpg', video: 'film5.mp4', genre: 'Ужасы' },
      { id: '6', name: 'Film 6', image: 'film6.jpg', video: 'film6.mp4', genre: 'Ужасы' },
      { id: '7', name: 'Film 5', image: 'film5.jpg', video: 'film5.mp4', genre: 'Ужасы' }
    ];
    expect(result).toEqual(expected);
    expect(result.length).toBe(SIMILAR_FILM_COUNT);
  });

  it('should return an empty array if there are no similar films', () => {
    const genre = 'Фантастика';
    const result = getSimilarMovies({genre, filmId, films});
    expect(result).toEqual([]);
  });
});