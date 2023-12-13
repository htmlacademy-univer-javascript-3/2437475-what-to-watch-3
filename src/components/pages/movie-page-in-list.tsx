import { AppRoute } from '../app';
import { Link, useParams } from 'react-router-dom';
import { Detail } from '../../mocks/details';
import { Cards } from '../film-card';
import { Footer } from '../footer';
import { getReviewRoute } from '../functions/get-review-route';
import { getSimilarMovies } from '../functions/get-similar-movies';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, setDetails, updateAuthorizationStatus } from '../../store/reducer';
import React, { useEffect } from 'react';
import { AppDispatch } from '../../store';
import { getFilm } from '../../store/api-action';
import Spinner from '../spinner';
import { PageNotFound } from './not-found-page';

export function MoviePageInList() {

  const { id } = useParams();
  const filmId = id?.split('=')[1];
  const films = useSelector((state: AppState) => state.films);
  const film = films.find((filmInFilms) => filmInFilms.id === filmId);

  const details = useSelector((state: AppState) => state.details);
  const detail = details.find((detailInDetails) => detailInDetails.filmId === filmId);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchFilmDetails = async () => {
      const serverDetailAction = await dispatch(getFilm(filmId as string));
      const serverDetail = serverDetailAction.payload;
      dispatch(setDetails(serverDetail as Detail));
    };

    if(!detail) {
      fetchFilmDetails();
    }
  }, [detail, dispatch, filmId]);

  if (!film) {
    return <PageNotFound/>;
  }

  if (!detail) {
    return <Spinner/>;
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    dispatch(updateAuthorizationStatus(false));
  };

  return(
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.image} alt={film.name} width="218" height="327" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to={AppRoute.MainPage} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link" onClick={handleSignOut}>Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
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
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 18 14" width="18" height="14">
                    <use xlinkHref="#in-list"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to={getReviewRoute(film.id)} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.image} alt={film.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item film-nav__item--active">
                    <a href="#" className="film-nav__link">Overview</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="#" className="film-nav__link">Details</a>
                  </li>
                  <li className="film-nav__item">
                    <a href="#" className="film-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>

              <div className="film-rating">
                <div className="film-rating__score">{detail.rating}</div>
                <p className="film-rating__meta">
                  <span className="film-rating__level">{detail.ratingDescription}</span>
                  <span className="film-rating__count">{detail.votes} ratings</span>
                </p>
              </div>

              <div className="film-card__text">
                <p>{detail.description}</p>
                <p className="film-card__director"><strong>Director: {detail.director}</strong></p>

                <p className="film-card__starring"><strong>Starring: {detail.actors}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <Cards films={getSimilarMovies({genre: detail.genre, filmId: film.id, films: films})}> </Cards>
        </section>

        <Footer/>
      </div>
    </React.Fragment>
  );
}

