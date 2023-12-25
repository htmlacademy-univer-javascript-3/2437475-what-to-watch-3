import React, { useCallback, useState } from 'react';
import { Cards } from '../film-card';
import { Film} from '../../mocks/films';
import { Detail } from '../../mocks/details';
import { Footer } from '../footer';
import { GenreList } from '../genres-list';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../spinner';
import { Header } from '../header';
import { createSelector } from '@reduxjs/toolkit';
import { ALL_GENRES, AppState, changeGenre } from '../../store/reducer';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../app';
import { AppDispatch } from '../../store';
import { postFilmInMyList } from '../../store/api-actions/api-actions-favorite';

export const FILMS_PAGE_SIZE = 8;

export type PropsMain = {
    film: Film;
    detail: Detail;
}

export function MainPage({film, detail}: PropsMain) {

  const loading = useSelector((state: AppState) => state.loading);
  const films = useSelector((state: AppState) => state.films);

  const authStatus = useSelector((state: AppState) => state.authorizationStatus);
  const myList = useSelector((state: AppState) => state.myList) || [];

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [activeGenre, setActiveGenre] = useState(ALL_GENRES);
  const [visibleMovies, setVisibleMovies] = useState(FILMS_PAGE_SIZE);
  const filteredMoviesSelector = createSelector(
    (state: AppState) => state.films,
    () => activeGenre,
    (filmsForFilter, activeGenreForFilter) => activeGenreForFilter === ALL_GENRES ? filmsForFilter : filmsForFilter.filter((filmForFilter) => filmForFilter.genre === activeGenreForFilter)
  );

  const filteredMovies = useSelector(filteredMoviesSelector);

  const handleGenreChange = useCallback((genre: string) => {
    setActiveGenre(genre);
    dispatch(changeGenre(genre));
    setVisibleMovies(FILMS_PAGE_SIZE);
  }, [dispatch]);

  const handleShowMore = useCallback(() => {
    setVisibleMovies((prev) => prev + FILMS_PAGE_SIZE);
  }, []);

  function handleMyListClick() {
    if (!authStatus) {
      navigate(AppRoute.LoginPage);
      return;
    }

    const isFavorite = myList.some((myFilm) => myFilm.id === film?.id);
    dispatch(postFilmInMyList({ filmId: film?.id , status: isFavorite ? 0 : 1 }));
  }

  if (loading) {
    return <Spinner/>;
  }

  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={detail.bigImage} alt={film.name} />
        </div>

        <h1 data-testid="hidden-test-main-page" className="visually-hidden">WTW</h1>

        <Header authStatus={authStatus} />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={film.image} alt={film.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{detail.genre}</span>
                <span className="film-card__year">{detail.year}</span>
              </p>

              <div className="film-card__buttons">

                <Link to={`${AppRoute.PlayerPage}=${film.id}`} className="btn btn--play film-card__button" type="button" >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>

                <button className="btn btn--list film-card__button" type="button" onClick={handleMyListClick}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref={authStatus && myList.some((myFilm) => myFilm.id === film.id) ? '#in-list' : '#add'}></use>
                  </svg>
                  <span>My list</span>
                  {authStatus && <span className="film-card__count">{myList.length}</span>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList films={films} activeGenre={activeGenre} onGenreChange={handleGenreChange}/>

          <Cards films={filteredMovies.slice(0, visibleMovies)}>
            {
              filteredMovies.length > visibleMovies &&
              <button className="catalog__button" type="button" onClick={handleShowMore}>Show more</button>
            }
          </Cards>
        </section>

        <Footer/>
      </div>
    </React.Fragment>
  );
}

