import { Link } from 'react-router-dom';
import { AppRoute } from '../app';
import { Cards } from '../film-card';
import { Footer } from '../footer';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { AppDispatch } from '../../store';
import { updateAuthorizationStatus } from '../../store/action';


export function MyList() {
  const dispatch = useDispatch<AppDispatch>();
  const handleSignOut = () => {
    localStorage.removeItem('token');
    dispatch(updateAuthorizationStatus(false));
  };
  const films = useSelector((state: AppState) => state.films);
  return(
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.MainPage} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">9</span></h1>
        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <a className="user-block__link" onClick={handleSignOut}>Sign out</a>
          </li>
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <Cards films={films}>
        </Cards>

      </section>

      <Footer/>
    </div>
  );
}
