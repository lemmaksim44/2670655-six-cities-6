import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../page/main-page/main-page';
import LoginPage from '../../page/login-page/login-page';
import FavoritesPage from '../../page/favorites-page/favorites-page';
import OfferPage from '../../page/offer-page/offer-page';
import Page404 from '../../page/page-404/page-404';

import { OfferType } from '../../types/offer';
import { ReviewType } from '../../types/review';

type AppProps = {
  offers: OfferType[];
  reviews: ReviewType[];
}

function App({offers, reviews}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage offers={offers}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <FavoritesPage offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<OfferPage offers={offers} reviews={reviews}/>}
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
