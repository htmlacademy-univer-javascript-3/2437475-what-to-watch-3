import React from 'react';
import { AppRoute, getReviewRoute } from '../app';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Details } from '../../mocks/details';
import { Films } from '../../mocks/films';
import { Overviews } from '../../mocks/overview';
import { Cards, getSimilarMovies } from '../film-card';
import { Footer } from '../footer';

export function MoviePageInList() {

  const { id } = useParams();
  const filmId = id?.split('=')[1];
  const film = Films.find((filmInFilms) => filmInFilms.id === filmId);

  const detail = Details.find((detailInDetails) => detailInDetails.filmId === filmId);
  const overview = Overviews.find((overviewInOverviews) => overviewInOverviews.filmId === filmId);

  const navigate = useNavigate();
  if (!film || !detail || !overview) {
    navigate(AppRoute.NotFoundPage);
    return null;
  }

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
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{detail.genre}</span>
                <span className="film-card__year">{detail.year.getFullYear()}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
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
                <div className="film-rating__score">{overview.rating}</div>
                <p className="film-rating__meta">
                  <span className="film-rating__level">{overview.ratingDescription}</span>
                  <span className="film-rating__count">{overview.votes} ratings</span>
                </p>
              </div>

              <div className="film-card__text">
                <p>{overview.description}</p>
                <p className="film-card__director"><strong>Director: {overview.director}</strong></p>

                <p className="film-card__starring"><strong>Starring: {overview.actors}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <Cards films={getSimilarMovies({genre: detail.genre, filmId: film.id, films: Films})}>
          </Cards>
        </section>

        <Footer/>
      </div>
    </React.Fragment>
  );
}
