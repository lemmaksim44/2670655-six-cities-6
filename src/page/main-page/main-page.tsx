import MainPageCitiesList from './main-page-cities-list';
import MainPageCities from './main-page-cities';
import { OfferPreviewType } from '../../types/offer-preview';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { fetchOffers } from '../../store/action';
import { useEffect } from 'react';
import MainPageEmpty from './main-page-empty';

type MainPageProps = {
  offers: OfferPreviewType[];
}

function MainPage({offers}: MainPageProps) {
  const dispatch = useDispatch();
  const city = useSelector((state: RootState) => state.city);
  const filteredOffers = offers.filter((offer) => offer.city.name === city.toString());
  const hasOffers = filteredOffers.length > 0;

  useEffect(() => {
    dispatch(fetchOffers(offers));
  }, [dispatch, offers]);

  return (
    <div className="page page--gray page--main ">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index ${hasOffers ? '' : 'page__main--index-empty'}`}>
        <MainPageCitiesList/>
        {hasOffers ? (
          <MainPageCities offers={filteredOffers} />
        ) : (
          <MainPageEmpty/>
        )}
      </main>
    </div>
  );
}

export default MainPage;
