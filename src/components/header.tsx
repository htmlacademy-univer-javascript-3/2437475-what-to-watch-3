import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from './app';

type PropsHeader = {
    authStatus: boolean;
}

export function Header({ authStatus }: PropsHeader) {
  return (
    <header className="page-header film-card__head">
      <div className="logo">
        <Link to={AppRoute.MainPage} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <ul className="user-block">
        {authStatus === true && (
          <React.Fragment>
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link">Sign out</a>
            </li>
          </React.Fragment>
        )}
        {authStatus === false && (
          <Link to={AppRoute.LoginPage} className="user-block__link">
              Sign in
          </Link>
        )}

      </ul>
    </header>
  );
}
