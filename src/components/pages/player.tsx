import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, setDetails } from '../../store/reducer';
import { Detail } from '../../mocks/details';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Spinner from '../spinner';
import { AppDispatch } from '../../store';
import { getFilm } from '../../store/api-action';
import { PageNotFound } from './not-found-page';
import { createSelector } from '@reduxjs/toolkit';
import { AppRoute } from '../app';
import React from 'react';

export function Player() {
  const { id } = useParams();
  const filmId = id?.split('=')[1];
  
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

  const [progressPercentage, setProgressPercentage] = useState(0);

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

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    const video = videoRef.current;

    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }

      setIsPlaying(!isPlaying);
    }
  };

  const handleFullScreen = () => {
    const video = videoRef.current;

    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    }
  };

  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const calculateTimeLeft = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      const remainingTime = Math.ceil(video.duration - video.currentTime);
  
      const hours = Math.floor(remainingTime / 3600);
      const minutes = Math.floor((remainingTime % 3600) / 60);
      const seconds = remainingTime % 60;
  
      setTimeLeft({ hours, minutes, seconds });

      const percentage = (video.currentTime / video.duration) * 100;
      setProgressPercentage(percentage);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", calculateTimeLeft);
      return () => {
        video.removeEventListener("timeupdate", calculateTimeLeft);
      };
    }
  }, [calculateTimeLeft]);

  const handleTogglerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (video) {
      const progressContainer = event.currentTarget.parentElement?.parentElement;
      if (progressContainer) {
        const containerWidth = progressContainer.offsetWidth;
        const clickX = event.clientX - progressContainer.getBoundingClientRect().left;
        const percentage = (clickX / containerWidth) * 100;
        const seekTime = (video.duration * percentage) / 100;
        video.currentTime = seekTime;
      }
    }
  }; 

  if (!film) {
    return <PageNotFound/>;
  }

  if (!detail) {
    return <Spinner/>;
  }

  return(
    <div className="player">
      <video ref={videoRef} src={detail.video} className="player__video" poster={film.image}></video>

      <Link to={`${AppRoute.FilmPage}=${film.id}`} type="button" style={{ textDecoration: 'none' }} className="player__exit">
        Exit
      </Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time" onClick={handleTogglerClick}>
            <progress className="player__progress" value={progressPercentage} max="100" ></progress>
            <div className="player__toggler" style={{left: `${progressPercentage}%`}} >Toggler</div>
          </div>
          <div className="player__time-value">
          {timeLeft.hours > 0 && (
            <React.Fragment>
              {`-${String(timeLeft.hours).padStart(2, "0")}:`}
            </React.Fragment>
          )}
          {`${String(timeLeft.minutes).padStart(2, "0")}:${String(timeLeft.seconds).padStart(2, "0")}`}
        </div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlayPause}>
            {isPlaying ? 
            <React.Fragment>
            <svg viewBox="0 0 14 21" width="14" height="21">
              <use xlinkHref="#pause"></use>
            </svg>
            <span>Pause</span>
            </React.Fragment> : 
            <React.Fragment>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
            </React.Fragment> }
          </button>
          <div className="player__name">Transpotting</div>

          <button type="button" className="player__full-screen" onClick={handleFullScreen}>
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
