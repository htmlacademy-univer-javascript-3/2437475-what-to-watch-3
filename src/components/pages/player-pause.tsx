import { Detail } from '../../mocks/details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { useEffect } from 'react';
import { AppDispatch } from '../../store';
import { setDetails } from '../../store/action';
import { getFilm } from '../../store/api-action';
import Spinner from '../spinner';
import { PageNotFound } from './not-found-page';

export function PlayerPause() {
  const { id } = useParams();
  const filmId = id?.split('=')[1];
  const films = useSelector((state: AppState) => state.films);
  const film = films.find((filmInFilms) => filmInFilms.id === filmId);

  const details = useSelector((state: AppState) => state.details);
  const detail = details.find((detailInDetails) => detailInDetails.filmId === filmId);


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

  if (!film) {
    return <PageNotFound/>;
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
            <svg viewBox="0 0 14 21" width="14" height="21">
              <use xlinkHref="#pause"></use>
            </svg>
            <span>Pause</span>
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
