import { OfferPreviewType } from '../../types/offer-preview';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
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
      <Header/>

      <main className={`page__main page__main--favorites ${hasOffers ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {hasOffers ? <FavoritesPageList offers={groupCitiesOffer}/> : <FavoritesPageEmpty/>}
        </div>
      </main>

      <Footer/>
    </div>
  );
}

export default FavoritesPage;
