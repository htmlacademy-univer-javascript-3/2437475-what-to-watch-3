import { render } from '@testing-library/react';
import { PrivateRoute } from './private-route';
import { createStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

function rootReducer(state = { authorizationStatus: true },) {
  return state;
}

test('renders children when authorizationStatus is true', () => {
  const store = createStore(rootReducer);

  const { getByText } = render(
    <Provider store={store}>
      <PrivateRoute>
        <div>Private Content</div>
      </PrivateRoute>
    </Provider>
  );
  expect(getByText('Private Content')).toBeInTheDocument();
});
