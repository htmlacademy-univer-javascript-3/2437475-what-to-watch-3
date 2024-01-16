import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../app';
import { Footer } from '../../footer/footer';
import { FormEvent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../store/reducer';
import { AppDispatch } from '../../../store';
import React from 'react';
import { Logo } from '../../logo/logo';
import { signIn } from '../../../store/api-actions/api-actions-user';
import { ServerErrorMessage } from '../../server-error-message/server-error-message';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const authStatus = useSelector((state: AppState) => state.authorizationStatus);

  const handleErrorMessage = useCallback((message: string) => {
    setError(message);
  }, []);

  const SubmitLoginCredentials = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      handleErrorMessage('Sorry, the email is incorrect');
    } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(password)) {
      handleErrorMessage('Sorry, the password is incorrect');
    } else {
      const response = await dispatch(signIn({ email, password }));
      if (!response.payload) {
        handleErrorMessage('Sorry, login failed. Try again later');
      }
    }
    setIsLoading(false);

  }, [dispatch, email, password, handleErrorMessage]);

  const serverIsAvailable = useSelector((state: AppState) => state.serverIsAvailable);

  if (!serverIsAvailable) {
    return <ServerErrorMessage/>;
  }

  return(
    <React.Fragment>
      {authStatus && (<Navigate to={AppRoute.Main} replace/>)}
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo/>

          <h1 data-testid="hidden-test-login-page" className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form className="sign-in__form" onSubmit={(event) => void SubmitLoginCredentials(event)}>
            {(
              <div className="sign-in__message">
                <p>{errorMessage}</p>
              </div>
            )}

            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email"
                  value={email} required onChange={(event) => setEmail(event.target.value)}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password"
                  value={password} required onChange={(event) => setPassword(event.target.value)}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit" disabled={isLoading}>Sign in</button>
            </div>
          </form>
        </div>

        <Footer/>
      </div>
    </React.Fragment>
  );
}
