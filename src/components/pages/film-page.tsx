import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Detail } from '../../mocks/details';
import { Cards } from '../film-card';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { TabsNavigation } from '../tab-navigation';
import { DetailsTab } from '../tab-details';
import { OverviewTab } from '../tab-overviews';
import { ReviewsTab } from '../tab-reviews';
import { Footer } from '../footer';
import { getReviewRoute } from '../functions/get-review-route';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, setDetail } from '../../store/reducer';
import Spinner from '../spinner';
import { AppDispatch } from '../../store';
import { Header } from '../header';
import { Film } from '../../mocks/films';
import { Review } from '../../mocks/reviews';
import { PageNotFound } from './not-found-page';
import { createSelector } from '@reduxjs/toolkit';
import { AppRoute } from '../app';
import { getReviews } from '../../store/api-actions/api-actions-comments';
import { postFilmInMyList } from '../../store/api-actions/api-actions-favorite';
import { getFilm, getSimilarFilms } from '../../store/api-actions/api-actions-films';

export const SIMILAR_FILM_COUNT = 4;

export function MoviePage() {

  const { id } = useParams();
  const filmId = id?.split('=')[1];

  const [similarFilms, setSimilarFilms] = useState<Film[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const authStatus = useSelector((state: AppState) => state.authorizationStatus);
  const myList = useSelector((state: AppState) => state.myList) || [];

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

  const [activeTab, setActiveTab] = useState('Overview');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const fetchFilmDetails = useCallback(async () => {
    const serverDetailAction = await dispatch(getFilm(filmId as string));
    const serverDetail = serverDetailAction.payload;
    dispatch(setDetail(serverDetail as Detail));
  }, [dispatch, filmId]);

  const fetchSimilarFilms = useCallback(async () => {
    const serverSimilarFilmsAction = await dispatch(getSimilarFilms(filmId as string));
    setSimilarFilms((serverSimilarFilmsAction.payload as Film[]).slice(0, SIMILAR_FILM_COUNT));
  }, [dispatch, filmId]);

  const fetchReviews = useCallback(async () => {
    const serverReviewsAction = await dispatch(getReviews(filmId as string));
    setReviews((serverReviewsAction.payload as Review[]));
  }, [dispatch, filmId]);

  useEffect(() => {
    if(!detail) {
      fetchFilmDetails();
    }
  }, [detail, dispatch, filmId, fetchFilmDetails]);

  useEffect(() => {
    fetchSimilarFilms();
  }, [dispatch, filmId, fetchSimilarFilms]);

  useEffect(() => {
    fetchReviews();
  }, [dispatch, filmId, fetchReviews]);

  function handleMyListClick() {
    if (!authStatus) {
      navigate(AppRoute.LoginPage);
      return;
    }

    const isFavorite = myList.some((myFilm) => myFilm.id === film?.id);
    dispatch(postFilmInMyList({ filmId: film?.id as string, status: isFavorite ? 0 : 1 }));
  }

  if (!film) {
    return <PageNotFound/>;
  }

  if (!detail) {
    return <Spinner/>;
  }

  return(
    <React.Fragment>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={detail.bigImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header authStatus={authStatus} />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 data-testid="hidden-test-film-page" className="film-card__title">{film.name}</h2>
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
                {authStatus && (<Link to={getReviewRoute(film.id)} className="btn film-card__button">Add review</Link>)}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={detail.poster} alt={film.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <TabsNavigation activeTab={activeTab} setTab={setActiveTab}/>

              {activeTab === 'Overview' && <OverviewTab overview={detail} />}
              {activeTab === 'Details' && <DetailsTab detail={detail} />}
              {activeTab === 'Reviews' && <ReviewsTab reviews={reviews} />}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <Cards films={similarFilms}> </Cards>
        </section>

        <Footer/>
      </div>
    </React.Fragment>
  );
}
