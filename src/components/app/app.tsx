import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../private-route/private-route';
import MainPage from '../../page/main-page/main-page';
import LoginPage from '../../page/login-page/login-page';
import FavoritesPage from '../../page/favorites-page/favorites-page';
import OfferPage from '../../page/offer-page/offer-page';
import Page404 from '../../page/page-404/page-404';

type AppProps = {
  cardQuantity: number;
}

function App({cardQuantity}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage cardQuantity={cardQuantity}/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <FavoritesPage/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage/>}
        />
        <Route
          path='*'
          element={<Page404/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
