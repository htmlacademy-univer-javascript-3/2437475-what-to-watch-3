import { getFilm } from "../../api";
import { Detail } from "../../mocks/details";
import { Film } from "../../mocks/films";
import { Overview } from "../../mocks/overview";
import store from "../../store";
import { setLoading, setDetails, setOverviews } from "../../store/action";

export async function getMoreInfoAboutFilm(film: Film) {
    store.dispatch(setLoading(true));

    let filmId = film.id;
    let loadingFilm = await store.dispatch(getFilm(filmId));
  
    let filmDetail: Detail = {
      filmId: film.id,
      genre: film.genre,
      year:  await loadingFilm.payload.released,
      director: await loadingFilm.payload.director,
      actors: await loadingFilm.payload.starring ,
      duration: {
        hours: Math.floor(await loadingFilm.payload.runTime / 60),
        minutes: await loadingFilm.payload.runTime % 60
      },
      bigImage: await loadingFilm.payload.backgroundImage as string
    };

    let filmOverview: Overview = {
      filmId: film.id,
      description: await loadingFilm.payload.description,
      rating: await loadingFilm.payload.rating,
      ratingDescription: getRatingDescription(loadingFilm.payload.rating),
      votes: await loadingFilm.payload.scoresCount,
      director: await loadingFilm.payload.director,
      actors: await loadingFilm.payload.starring
    }
  
    let state = store.getState();

    store.dispatch(setDetails(state.details.concat(filmDetail)));
    store.dispatch(setOverviews(state.overviews.concat(filmOverview)));
    store.dispatch(setLoading(false));

    return [filmDetail, filmOverview];
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