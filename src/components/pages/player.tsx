import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../app';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { Detail } from '../../mocks/details';
import { getMoreInfoAboutFilm } from '../functions/get-more-info-about-film';
import { useEffect } from 'react';
import Spinner from '../spinner';

export function Player() {
  const { id } = useParams();
  const filmId = id?.split('=')[1];
  const films = useSelector((state: AppState) => state.films);
  const film = films.find((filmInFilms) => filmInFilms.id === filmId);

  const details = useSelector((state: AppState) => state.details);
  let detail = details.find((detailInDetails) => detailInDetails.filmId === filmId);

  const navigate = useNavigate();

  useEffect(() => {
    if (!film) {
      navigate(AppRoute.NotFoundPage);
    }
  }, [film, navigate]);

  const fetchData = async () => {
    if (!detail && film) {
      const [newDetail, ] = await getMoreInfoAboutFilm(film);
      detail = newDetail as Detail;
    }
  };

  useEffect(() => {
    fetchData();
  }, [detail, film, fetchData]);

  if (!film) {
    return null;
  }

  if (!detail) {
    return <Spinner/>;
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
          <div className="player__time-value">{detail.duration.hours}:{detail.duration.minutes}</div>
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
