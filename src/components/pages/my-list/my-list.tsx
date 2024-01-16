import { Cards } from '../../film-card/film-card';
import { Footer } from '../../footer/footer';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
import { SignOutLink } from '../../sign-link/sign-out-link/sign-out-link';
import { Logo } from '../../logo/logo';
import { ServerErrorMessage } from '../../server-error-message/server-error-message';

export function MyList() {
  const favoriteFilms = useSelector((state: AppState) => state.myList) || [];
  const serverIsAvailable = useSelector((state: AppState) => state.serverIsAvailable);

  if (!serverIsAvailable) {
    return <ServerErrorMessage/>;
  }
  return(
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>
        <h1 className="page-title user-page__title" data-testid="hidden-test-my-list-page">
          My list
          <span className="user-page__film-count">
            {favoriteFilms.length}
          </span>
        </h1>
        <ul className="user-block">
          <SignOutLink />
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <Cards films={favoriteFilms}> </Cards>
      </section>

      <Footer/>
    </div>
  );
}
