import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {Main} from './pages/main-page';
import {propsMain} from './pages/main-page';
import {SignIn} from './pages/sign-in';
import {MyList} from './pages/my-list';
import {MoviePage} from './pages/movie-page';
import {AddReview} from './pages/add-review';
import {Player} from './pages/player';
import {PageNotFound} from './pages/not-found-page';
import {PrivateRoute} from './private-route';

export type propsApp = {
    paramsMain: propsMain;
}

export function App({paramsMain}: propsApp) {
  return (
    <Router>
      <Routes>
        <Route path={AppRoute.Main} element={<Main {...paramsMain}/>} />
        <Route path={AppRoute.Login} element={<SignIn />} />
        <Route path={AppRoute.MyList} element={
          <PrivateRoute>
            <MyList />
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Movie} element={<MoviePage />} />
        <Route path={AppRoute.Review} element={<AddReview />} />
        <Route path={AppRoute.Player} element={<Player />} />
        <Route path={AppRoute.NotFound} element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export enum AppRoute {
  Main = '/',
  Login = '/login',
  MyList = '/mylist',
  Movie = '/films/:id',
  Review = '/films/:id/review',
  Player = '/player/:id',
  NotFound = '*',
}