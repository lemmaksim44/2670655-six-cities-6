import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { OfferPreviewType } from '../../types/offer-preview';
import { AppDispatchType } from '../../store';
import { City } from '../../const';
import { AppRoute } from '../../const';
import { setCity } from '../../store/offers/action';
import FavoritesPageCard from './favorites-page-card';

type FavoritesPageCities = {
  city: string;
  offers: OfferPreviewType[];
}

function FavoritesPageCities({city, offers}: FavoritesPageCities) {
  const dispatch = useDispatch<AppDispatchType>();

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Main} onClick={() => dispatch(setCity(city as City))}>
            <span>{city}</span>
          </Link>
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
