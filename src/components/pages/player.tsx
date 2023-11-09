import { Films } from '../../mocks/films';
import { Details } from '../../mocks/details';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../app';

export function Player() {
  const { id } = useParams();
  const filmId = id?.split('=')[1];
  const film = Films.find((filmInFilms) => filmInFilms.id === filmId);

  const detail = Details.find((detailInDetails) => detailInDetails.filmId === filmId);

  const navigate = useNavigate();
  if (!film || !detail) {
    navigate(AppRoute.NotFoundPage);
    return null;
  }

  return(
    <div className="player">
      <video src={film.video} className="player__video" poster={film.image}></video>

      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">{detail.duration.hours}:{detail.duration.minutes}:{detail.duration.seconds}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
