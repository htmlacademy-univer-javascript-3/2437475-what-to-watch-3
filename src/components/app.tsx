import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { MainPage } from './pages/main-page/main-page';
import { PropsMain } from './pages/main-page/main-page';
import { SignIn } from './pages/sign-in/sign-in';
import { MyList } from './pages/my-list/my-list';
import { MoviePage } from './pages/film-page/film-page';
import { AddReview } from './pages/add-review/add-review';
import { Player } from './pages/player/player';
import { PageNotFound } from './pages/not-found-page/not-found-page';
import { PrivateRoute } from './private-route/private-route';

export enum AppRoute {
  Main = '/',
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
        <Route path={AppRoute.Main} element={<MainPage {...paramsMain}/>} />
        <Route path={AppRoute.LoginPage} element={<SignIn />} />
        <Route path={AppRoute.MyListPage} element={
          <PrivateRoute>
            <MyList />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.FilmPage} element={<MoviePage />} />
        <Route path={AppRoute.ReviewPage} element={
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.PlayerPage} element={<Player />} />
        <Route path={AppRoute.NotFoundPage} element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

