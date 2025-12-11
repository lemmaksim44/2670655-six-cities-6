import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute } from '../../const';
import { AppDispatchType } from '../../store';
import { fetchCheckAuth } from '../../store/user/action';

import PrivateRoute from '../private-route/private-route';
import MainPage from '../../page/main-page/main-page';
import LoginPage from '../../page/login-page/login-page';
import FavoritesPage from '../../page/favorites-page/favorites-page';
import OfferPage from '../../page/offer-page/offer-page';
import Page404 from '../../page/page-404/page-404';

function App() {
  const dispatch = useDispatch<AppDispatchType>();

  useEffect(() => {
    dispatch(fetchCheckAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage/>
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<OfferPage/>}
        />
        <Route
          path={AppRoute.Page404}
          element={<Page404/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
