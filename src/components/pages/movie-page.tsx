import React, { useEffect, useState } from 'react';

import { Detail } from '../../mocks/details';
import { Cards } from '../film-card';
import { Link, useParams } from 'react-router-dom';

import { TabsNavigation } from '../tab-navigation';
import { DetailsTab } from '../tab-details';
import { OverviewTab } from '../tab-overviews';
import { ReviewsTab } from '../tab-reviews';
import { Footer } from '../footer';
import { getReviewRoute } from '../functions/get-review-route';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import Spinner from '../spinner';
import { getFilm, getReviews, getSimilarFilms } from '../../store/api-action';
import { AppDispatch } from '../../store';
import { setDetails } from '../../store/action';
import { Header } from '../header';
import { Film } from '../../mocks/films';
import { Review } from '../../mocks/reviews';
import { SIMILAR_FILM_COUNT } from '../../constants';
import { PageNotFound } from './not-found-page';

export function MoviePage() {

  const { id } = useParams();
  const filmId = id?.split('=')[1];

  const [similarFilms, setSimilarFilms] = useState<Film[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const authStatus = useSelector((state: AppState) => state.authorizationStatus);

  const films = useSelector((state: AppState) => state.films);
  const film = films.find((filmInFilms) => filmInFilms.id === filmId);

  const details = useSelector((state: AppState) => state.details);
  const detail = details.find((detailInDetails) => detailInDetails.filmId === filmId);

  const [activeTab, setActiveTab] = useState('Overview');


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

  useEffect(() => {
    const fetchSimilarFilms = async () => {
      const serverSimilarFilmsAction = await dispatch(getSimilarFilms(filmId as string));
      setSimilarFilms((serverSimilarFilmsAction.payload as Film[]).slice(0, SIMILAR_FILM_COUNT));
    };

    fetchSimilarFilms();
  }, [dispatch, filmId]);

  useEffect(() => {
    const fetchReviews = async () => {
      const serverReviewsAction = await dispatch(getReviews(filmId as string));
      setReviews((serverReviewsAction.payload as Review[]));
    };

    fetchReviews();
  }, [dispatch, filmId]);

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
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{detail.genre}</span>
                <span className="film-card__year">{detail.year}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
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
          <Cards films={similarFilms}>
          </Cards>
        </section>

        <Footer/>
      </div>
    </React.Fragment>
  );
}
