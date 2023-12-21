import { Link, Navigate, useParams } from 'react-router-dom';
import { AppRoute } from '../app';
import { AddReviewForm } from '../add-review-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, setDetail } from '../../store/reducer';
import { useCallback, useEffect, useMemo } from 'react';
import { Detail } from '../../mocks/details';
import { AppDispatch } from '../../store';
import { getFilm } from '../../store/api-actions/api-actions-films';
import Spinner from '../spinner';
import { PageNotFound } from './not-found-page';
import { createSelector } from '@reduxjs/toolkit';
import { SignOutLink } from '../sign-out-link';
import { Logo } from '../logo';

export function AddReview() {
  const { id } = useParams();
  const filmId = id?.split('=')[1];

  const authStatus = useSelector((state: AppState) => state.authorizationStatus);

  const filmSelector = useMemo(() =>
    createSelector(
      (state: AppState) => state.films,
      (films) => films.find((filmInFilms) => filmInFilms.id === filmId)
    ),
  [filmId]
  );

  const detailsSelector = useMemo(() =>
    createSelector(
      (state: AppState) => state.details,
      (details) => details.find((detailInDetails) => detailInDetails.filmId === filmId)
    ),
  [filmId]
  );

  const film = useSelector(filmSelector);
  const detail = useSelector(detailsSelector);

  const dispatch = useDispatch<AppDispatch>();

  const fetchFilmDetails = useCallback(async () => {
    const serverDetailAction = await dispatch(getFilm(filmId as string));
    const serverDetail = serverDetailAction.payload;
    dispatch(setDetail(serverDetail as Detail));
  }, [dispatch, filmId]);

  useEffect(() => {
    if (!detail) {
      fetchFilmDetails();
    }
  }, [detail, fetchFilmDetails]);

  if (!film) {
    return <PageNotFound/>;
  }

  if (!detail) {
    return <Spinner/>;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={detail.bigImage} alt={film.name} />
        </div>

        <h1 data-testid="hidden-test-review-page" className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.FilmPage}=${film.id}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <ul className="user-block">
            {authStatus === true && (<SignOutLink/>)}
            {authStatus === false && (<Navigate to={AppRoute.LoginPage} />)}
          </ul>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.image} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm />
      </div>

    </section>
  );
}
