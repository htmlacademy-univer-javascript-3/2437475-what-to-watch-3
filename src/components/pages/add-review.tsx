import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../app';
import { AddReviewForm } from '../add-review-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, setDetails, updateAuthorizationStatus } from '../../store/reducer';
import { useCallback, useEffect, useMemo } from 'react';
import { Detail } from '../../mocks/details';
import { AppDispatch } from '../../store';
import { getFilm } from '../../store/api-action';
import Spinner from '../spinner';
import React from 'react';
import { PageNotFound } from './not-found-page';
import { createSelector } from '@reduxjs/toolkit';

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
    dispatch(setDetails(serverDetail as Detail));
  }, [dispatch, filmId]);

  useEffect(() => {
    if (!detail) {
      fetchFilmDetails();
    }
  }, [detail, fetchFilmDetails]);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem('token');
    dispatch(updateAuthorizationStatus(false));
  }, [dispatch]);

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

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={AppRoute.MainPage} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

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
            {authStatus === true && (
              <React.Fragment>
                <li className="user-block__item">
                  <div className="user-block__avatar">
                    <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                  </div>
                </li>
                <li className="user-block__item">
                  <a className="user-block__link" onClick={handleSignOut}>Sign out</a>
                </li>
              </React.Fragment>
            )}
            {authStatus === false && (
              <Link to={AppRoute.LoginPage} className="user-block__link">
              Sign in
              </Link>
            )}
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
