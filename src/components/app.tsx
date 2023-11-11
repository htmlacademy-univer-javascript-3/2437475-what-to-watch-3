import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {Main} from './pages/main-page';
import {PropsMain} from './pages/main-page';
import {SignIn} from './pages/sign-in';
import {MyList} from './pages/my-list';
import {MoviePage} from './pages/movie-page';
import {AddReview} from './pages/add-review';
import {Player} from './pages/player';
import {PageNotFound} from './pages/not-found-page';
import {PrivateRoute} from './private-route';

export enum AppRoute {
  MainPage = '/',
  LoginPage = '/login',
  MyListPage = '/mylist',
  FilmPage = '/films/:id',
  ReviewPage = '/films/:id/review',
  PlayerPage = '/player/:id',
  NotFoundPage = '*',
}

export type PropsAppMain = {
  paramsMain: PropsMain;
}

export function App({paramsMain}: PropsAppMain) {
  return (
    <Router>
      <Routes>
        <Route path={AppRoute.MainPage} element={<Main {...paramsMain}/>} />
        <Route path={AppRoute.LoginPage} element={<SignIn />} />
        <Route path={AppRoute.MyListPage} element={
          <PrivateRoute>
            <MyList />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.FilmPage} element={<MoviePage />} />
        <Route path={AppRoute.ReviewPage} element={
          // <PrivateRoute>
          <AddReview />
          // </PrivateRoute>
        }
        />
        <Route path={AppRoute.PlayerPage} element={<Player />} />
        <Route path={AppRoute.NotFoundPage} element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

