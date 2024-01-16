import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/main-page/main-page';
import { MyList } from './pages/my-list/my-list';
import { SignIn } from './pages/sign-in/sign-in';
import { AppRoute } from './app';
import { Provider } from 'react-redux';
import appReducer, { ALL_GENRES } from '../store/reducer';
import { getDefaultMiddleware, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../api';
import { Film } from '../types/films';
import { Detail } from '../types/details';
import { PageNotFound } from './pages/not-found-page/not-found-page';

const testFilms: Film[] = [
  { id: '1', name: 'Film 1', genre: 'Drama', image: '', video: ''},
  { id: '2', name: 'Film 2', genre: 'Comedy', image: '', video: '' },
  { id: '2', name: 'Film 2', genre: 'All genres', image: '', video: '' }
];

const testDetails: Detail[] = [
  {
    filmId: '1',
    director: ' ',
    actors: [],
    duration: {
      hours: 0,
      minutes: 0
    },
    genre: 'Drama',
    year: 0,
    poster: '',
    bigImage: '',
    description: ' ',
    rating: 0,
    ratingDescription: ' ',
    votes: 0,
    video: '',
    isFavorite: false
  }
];

const testFilm: Film = { id: '1', name: 'Film 1', genre: 'Drama', image: '', video: ''};

const testDetail: Detail = {
  filmId: '1',
  director: ' ',
  actors: [],
  duration: {
    hours: 0,
    minutes: 0
  },
  genre: 'Drama',
  year: 0,
  poster: '',
  bigImage: '',
  description: ' ',
  rating: 0,
  ratingDescription: ' ',
  votes: 0,
  video: '',
  isFavorite: false
};

const propsMain = {
  film: testFilm,
  detail: testDetail
};

const testInitialState = {
  authorizationStatus: false,
  genre: ALL_GENRES,
  films: testFilms,
  details: testDetails,
  overviews: [],
  filteredMovies: [],
  serverIsAvailable: true
};

const testApi = createAPI();

const testMiddleware = getDefaultMiddleware({
  thunk: {
    extraArgument: testApi,
  },
  serializableCheck: {
    ignoredActions: ['setDetails'],
  },
});


const testStore = configureStore({
  reducer: appReducer,
  middleware: testMiddleware,
  preloadedState: testInitialState
});

test('renders main page', () => {
  render(
    <Provider store={testStore}>
      <MemoryRouter initialEntries={[AppRoute.Main]}>
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage {...propsMain}/>}/>
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  const mainPageElement = screen.getByTestId('hidden-test-main-page');
  expect(mainPageElement).toBeInTheDocument();
});

test('renders login page', () => {
  render(
    <Provider store={testStore}>
      <MemoryRouter initialEntries={[AppRoute.LoginPage]}>
        <Routes>
          <Route path={AppRoute.LoginPage} element={<SignIn />}/>
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  const loginPageElement = screen.getByTestId('hidden-test-login-page');
  expect(loginPageElement).toBeInTheDocument();
});

test('renders my list page', () => {
  render(
    <Provider store={testStore}>
      <MemoryRouter initialEntries={[AppRoute.MyListPage]}>
        <Routes>
          <Route path={AppRoute.MyListPage} element={<MyList />}/>
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  const myListPageElement = screen.getByTestId('hidden-test-my-list-page');
  expect(myListPageElement).toBeInTheDocument();
});

test('renders 404 page', () => {
  render(
    <Provider store={testStore}>
      <MemoryRouter initialEntries={['/test']}>
        <Routes>
          <Route path={'/test'} element={<PageNotFound />}/>
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  const notFoundPageElement = screen.getByTestId('hidden-test-error-page');
  expect(notFoundPageElement).toBeInTheDocument();
});
