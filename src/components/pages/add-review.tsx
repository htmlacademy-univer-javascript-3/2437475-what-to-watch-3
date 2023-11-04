import { Films } from '../../mocks/films';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AppRoute } from '../app';
import { AddReviewForm } from '../add-review-form';

export function AddReview() {
  const { id } = useParams();
  const filmId = id?.split('=')[1];
  const film = Films.find((filmInFilms) => filmInFilms.id === filmId);

  const navigate = useNavigate();
  if (!film) {
    navigate(AppRoute.NotFoundPage);
    return null;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.bigImage} alt={film.name} />
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
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
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
