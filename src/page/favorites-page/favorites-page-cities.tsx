import { OfferPreviewType } from "../../types/offer-preview";
import FavoritesPageCard from "./favorites-page-card";

type FavoritesPageCities = {
  city: string;
  offers: OfferPreviewType[];
}

function FavoritesPageCities({city, offers}: FavoritesPageCities) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <FavoritesPageCard key={offer.id} offer={offer} />
        ))}
      </div>
    </li>
  );
}

export default FavoritesPageCities;
