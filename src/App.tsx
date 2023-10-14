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
        <Route path="/" element={<Main {...paramsMain}/>} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/mylist" element={
          <PrivateRoute>
            <MyList />
          </PrivateRoute>
        }
        />
        <Route path="/films/:id" element={<MoviePage />} />
        <Route path="/films/:id/review" element={<AddReview />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}
