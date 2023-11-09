import React from 'react';
import { Detail } from '../mocks/details';
import { Overview } from '../mocks/overview';
import { Review } from '../mocks/reviews';
import { ReviewCards } from './review-card';

type PropsOverviewTab = {
    overview: Overview;
}

type PropsReviewTab = {
    reviews: Review[];
}

type PropsDetailsTab = {
    detail: Detail;
}

type PropsTabsNavigation = {
        setTab: (tabName: string) => void;
        activeTab: string;
}

export function TabsNavigation({setTab, activeTab}: PropsTabsNavigation) {
  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        <li className={`film-nav__item ${activeTab === 'Overview' ? 'film-nav__item--active' : ''}`}>
          <a className="film-nav__link" onClick={() => setTab('Overview')}>Overview</a>
        </li>
        <li className={`film-nav__item ${activeTab === 'Details' ? 'film-nav__item--active' : ''}`}>
          <a className="film-nav__link" onClick={() => setTab('Details')}>Details</a>
        </li>
        <li className={`film-nav__item ${activeTab === 'Reviews' ? 'film-nav__item--active' : ''}`}>
          <a className="film-nav__link" onClick={() => setTab('Reviews')}>Reviews</a>
        </li>
      </ul>
    </nav>
  );
}

export function OverviewTab({overview}: PropsOverviewTab) {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export function DetailsTab({detail}: PropsDetailsTab) {
  return(
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{detail.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {detail.actors}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{detail.duration.hours}h {detail.duration.minutes}m</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{detail.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{detail.year.getFullYear()}</span>
        </p>
      </div>
    </div>
  );
}

export function ReviewsTab({reviews}: PropsReviewTab) {
  const halfLength = Math.ceil(reviews.length / 2);
  return(
    <div className="film-card__reviews film-card__row">
      <ReviewCards reviews={reviews.slice(0, halfLength)}>
      </ReviewCards>
      <ReviewCards reviews={reviews.slice(halfLength, reviews.length)}>
      </ReviewCards>
    </div>
  );
}
