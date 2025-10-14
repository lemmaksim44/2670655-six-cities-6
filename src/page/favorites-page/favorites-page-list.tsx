import { OfferPreviewType } from '../../types/offer-preview';
import FavoritesPageCities from './favorites-page-cities';

type FavoritesPageListProps = {
  offers: Record<string, OfferPreviewType[]>;
};


function FavoritesPageList({offers}: FavoritesPageListProps) {
  return(
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {Object.entries(offers).map(([city, cityOffers]) => (
          <FavoritesPageCities
            key={city}
            city={city}
            offers={cityOffers}
          />
        ))}
      </ul>
    </section>
  );
}

export default FavoritesPageList;
