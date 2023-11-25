import { Detail } from '../mocks/details';

type PropsDetailsTab = {
    detail: Detail;
}

export function DetailsTab({detail}: PropsDetailsTab) {
  return(
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{detail.director}</span>
        </p>
        <div className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
          {detail.actors.map((actor, index) => (
 <div key={index}>
   {actor}
   <br />
 </div>
))}
          </span>
        </div>
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
          <span className="film-card__details-value">{detail.year}</span>
        </p>
      </div>
    </div>
  );
}
