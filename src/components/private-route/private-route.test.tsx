import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import PrivateRoute from './private-route';
import { AuthorizationStatus } from '../../const';

vi.mock('../../store/user/selectors', () => ({
  selectAuthorizationStatus: vi.fn(),
}));

import { selectAuthorizationStatus } from '../../store/user/selectors';

const renderWithProviders = (authorizationStatus: AuthorizationStatus) => {
  (selectAuthorizationStatus as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
    authorizationStatus
  );

  const store = configureStore({
    reducer: () => ({}),
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <PrivateRoute>
          <div>Protected content</div>
        </PrivateRoute>
      </MemoryRouter>
    </Provider>
  );
};

describe('PrivateRoute component', () => {
  it('renders nothing when authorization status is Unknown', () => {
    const { container } = renderWithProviders(AuthorizationStatus.Unknown);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders children when authorization status is Auth', () => {
    renderWithProviders(AuthorizationStatus.Auth);
    expect(screen.getByText('Protected content')).toBeInTheDocument();
  });

  it('redirects to login when authorization status is NoAuth', () => {
    renderWithProviders(AuthorizationStatus.NoAuth);
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
  });
});
