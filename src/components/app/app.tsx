import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../page/main-page/main-page';
import LoginPage from '../../page/login-page/login-page';
import FavoritesPage from '../../page/favorites-page/favorites-page';
import OfferPage from '../../page/offer-page/offer-page';
import Page404 from '../../page/page-404/page-404';

import { OfferPreviewType } from '../../types/offer-preview';
import { fetchCheckAuth } from '../../store/user/action';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatchType } from '../../store';

function App() {
  const offers: OfferPreviewType[] = [];
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
              <FavoritesPage offers={offers}/>
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
