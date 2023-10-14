import React from 'react';
import {Card} from '../film-card';

export type promoFilm = {
    name: string;
    genre: string;
    date: Date;
    image: string;
  }

export type propsMain = {
    film: promoFilm;
}

export function Main({film}: propsMain) {
  return (
    <React.Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={film.image} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

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

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={film.image} alt={film.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.date.getFullYear()}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <a href="#" className="catalog__genres-link">All genres</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Comedies</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Crime</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Documentary</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Dramas</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Horror</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Kids & Family</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Romance</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Sci-Fi</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Thrillers</a>
            </li>
          </ul>

          <div className="catalog__films-list">
            <Card name={'Fantastic Beasts: The Crimes of Grindelwald'} image={'img/fantastic-beasts-the-crimes-of-grindelwald.jpg'}/>
            <Card name={'Bohemian Rhapsody'} image={'img/bohemian-rhapsody.jpg'}/>
            <Card name={'Macbeth'} image={'img/macbeth.jpg'}/>
            <Card name={'Aviator'} image={'img/aviator.jpg'}/>

            <Card name={'We need to talk about Kevin'} image={'img/we-need-to-talk-about-kevin.jpg'}/>
            <Card name={'What We Do in The Shadows'} image={'img/what-we-do-in-the-shadows.jpg'}/>
            <Card name={'Revenant'} image={'img/revenant.jpg'}/>
            <Card name={'Johnny English'} image={'img/johnny-english.jpg'}/>

            <Card name={'Shutter Island'} image={'img/shutter-island.jpg'}/>
            <Card name={'Pulp Fiction'} image={'img/pulp-fiction.jpg'}/>
            <Card name={'No Country for Old Men'} image={'img/no-country-for-old-men.jpg'}/>
            <Card name={'Snatch'} image={'img/snatch.jpg'}/>

            <Card name={'Moonrise Kingdom'} image={'img/moonrise-kingdom.jpg'}/>
            <Card name={'Seven Years in Tibet'} image={'img/seven-years-in-tibet.jpg'}/>
            <Card name={'Midnight Special'} image={'img/midnight-special.jpg'}/>
            <Card name={'War of the Worlds'} image={'img/war-of-the-worlds.jpg'}/>

            <Card name={'Dardjeeling limited'} image={'img/dardjeeling-limited.jpg'}/>
            <Card name={'Orlando'} image={'img/orlando.jpg'}/>
            <Card name={'Mindhunter'} image={'img/mindhunter.jpg'}/>
            <Card name={'Midnight Special'} image={'img/midnight-special.jpg'}/>
          </div>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}
