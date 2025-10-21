import { OfferPreviewType } from '../../types/offer-preview';
import FavoritesPageEmpty from './favorites-page-empty';
import FavoritesPageList from './favorites-page-list';

type FavoritesPageProps = {
  offers: OfferPreviewType[];
}

function getGroupCitiesOffer(offers: OfferPreviewType[]) {
  const groupCityOffers: Record<string, OfferPreviewType[]> = {};

  for (let i = 0; i < offers.length; i++) {
    const city = offers[i].city.name;

    if (!groupCityOffers[city]) {
      groupCityOffers[city] = [];
    }

    groupCityOffers[city].push(offers[i]);
  }

  return groupCityOffers;
}

function FavoritesPage({offers}: FavoritesPageProps) {
  const hasOffers = offers.length !== 0;
  const groupCitiesOffer = getGroupCitiesOffer(offers);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
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

      <main className={`page__main page__main--favorites ${hasOffers ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {hasOffers ? <FavoritesPageList offers={groupCitiesOffer}/> : <FavoritesPageEmpty/>}
        </div>
      </main>

      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
