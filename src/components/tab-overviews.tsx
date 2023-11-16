import React from 'react';
import { Overview } from '../mocks/overview';

type PropsOverviewTab = {
    overview: Overview;
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
