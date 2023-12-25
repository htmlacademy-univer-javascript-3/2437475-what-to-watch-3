import appReducer, { initialState } from './reducer';

describe('appSlice reducer', () => {
  it('should handle changeGenre', () => {
    const prevState = initialState;
    const action = { type: 'app/changeGenre', payload: 'Action' };

    const nextState = appReducer(prevState, action);

    expect(nextState.genre).toEqual('Action');
  });

  it('should handle setFilms', () => {
    const prevState = initialState;
    const films = [{ id: '1', name: 'Film 1', image: 'image1.png', video: 'video1.mp4', genre: 'Action' }];
    const action = { type: 'app/setFilms', payload: films };

    const nextState = appReducer(prevState, action);

    expect(nextState.films).toEqual(films);
  });

  it('should handle setDetail', () => {
    const prevState = initialState;
    const detail = { filmId: '1', director: 'Director 1', actors: ['Actor 1', 'Actor 2'], duration: { hours: 2, minutes: 30 }, genre: 'Action', year: 2021, poster: 'poster.png', bigImage: 'bigImage.png', description: 'Description', rating: 5, ratingDescription: 'Excellent', votes: 100, video: 'video.mp4', isFavorite: false };
    const action = { type: 'app/setDetail', payload: detail };

    const nextState = appReducer(prevState, action);

    expect(nextState.details).toContain(detail);
  });

  it('should handle setDetails', () => {
    const prevState = initialState;
    const details = [
      { filmId: '1', director: 'Director 1', actors: ['Actor 1', 'Actor 2'], duration: { hours: 2, minutes: 30 }, genre: 'Action', year: 2021, poster: 'poster.png', bigImage: 'bigImage.png', description: 'Description', rating: 5, ratingDescription: 'Excellent', votes: 100, video: 'video.mp4', isFavorite: false },
      { filmId: '2', director: 'Director 2', actors: ['Actor 3', 'Actor 4'], duration: { hours: 1, minutes: 45 }, genre: 'Drama', year: 2020, poster: 'poster2.png', bigImage: 'bigImage2.png', description: 'Description 2', rating: 4, ratingDescription: 'Good', votes: 50, video: 'video2.mp4', isFavorite: true }
    ];
    const action = { type: 'app/setDetails', payload: details };

    const nextState = appReducer(prevState, action);

    expect(nextState.details).toEqual(details);
  });

  it('should handle setLoading', () => {
    const prevState = initialState;
    const action = { type: 'app/setLoading', payload: false };

    const nextState = appReducer(prevState, action);

    expect(nextState.loading).toBe(false);
  });

  it('should handle updateAuthorizationStatus', () => {
    const prevState = initialState;
    const action = { type: 'app/updateAuthorizationStatus', payload: true };

    const nextState = appReducer(prevState, action);

    expect(nextState.authorizationStatus).toBe(true);
  });

  it('should handle setFilmInMyList', () => {
    const prevState = initialState;
    const film = { id: '1', name: 'Film 1', image: 'image1.png', video: 'video1.mp4', genre: 'Action' };
    const action = { type: 'app/setFilmInMyList', payload: film };

    const nextState = appReducer(prevState, action);

    expect(nextState.myList).toContain(film);
  });

  it('should handle setMyList', () => {
    const prevState = initialState;
    const myList = [
      { id: '1', name: 'Film 1', image: 'image1.png', video: 'video1.mp4', genre: 'Action' },
      { id: '2', name: 'Film 2', image: 'image2.png', video: 'video2.mp4', genre: 'Drama' }
    ];
    const action = { type: 'app/setMyList', payload: myList };

    const nextState = appReducer(prevState, action);

    expect(nextState.myList).toEqual(myList);
  });
});
