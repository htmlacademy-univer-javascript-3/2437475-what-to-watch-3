import { getFilm } from '../../api';
import { Detail } from '../../mocks/details';
import { Film } from '../../mocks/films';
import { Overview } from '../../mocks/overview';
import store from '../../store';
import { setLoading, setDetails, setOverviews } from '../../store/action';

export interface serverFilm {
    id: string;
    name: string;
    previewImage: string;
    previewVideoLink: string;
    genre: string;
    posterImage: string;
    backgroundImage: string;
    backgroundColor: string;
    videoLink: string;
    description: string;
    rating: number;
    scoresCount: number;
    director: string;
    starring: string[];
    runTime: number;
    released: number;
    isFavorite: boolean;
}

function getRatingDescription(rating: number) {
  switch (true) {
    case (rating >= 0 && rating < 3):
      return 'Bad';
    case (rating >= 3 && rating < 5):
      return 'Normal';
    case (rating >= 5 && rating < 8):
      return 'Good';
    case (rating >= 8 && rating < 10):
      return 'Very good';
    case (rating === 10):
      return 'Awesome';
    default:
      return 'Invalid rating';
  }
}

export async function getMoreInfoAboutFilm(film: Film) {
  store.dispatch(setLoading(true));

  const filmId = film.id;
  const loadingFilm: serverFilm = (await store.dispatch(getFilm(filmId))).payload as serverFilm;

  const filmDetail: Detail = {
    filmId: film.id,
    genre: film.genre,
    year:  loadingFilm.released ,
    director: loadingFilm.director ,
    actors: loadingFilm.starring ,
    duration: {
      hours: Math.floor(loadingFilm.runTime / 60) ,
      minutes: loadingFilm.runTime % 60
    },
    bigImage: loadingFilm.backgroundImage
  };

  const filmOverview: Overview = {
    filmId: film.id,
    description: loadingFilm.description ,
    rating: loadingFilm.rating ,
    ratingDescription: getRatingDescription(loadingFilm.rating) as string,
    votes: loadingFilm.scoresCount ,
    director: loadingFilm.director ,
    actors: loadingFilm.starring
  };

  const state = store.getState();

  store.dispatch(setDetails(state.details.concat(filmDetail)));
  store.dispatch(setOverviews(state.overviews.concat(filmOverview)));
  store.dispatch(setLoading(false));

  return [filmDetail, filmOverview];
}
