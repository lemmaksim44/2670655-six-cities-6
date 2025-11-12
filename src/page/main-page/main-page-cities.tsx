import Card from '../../components/card/card';
import { OfferPreviewType } from '../../types/offer-preview';
import { useState } from 'react';
import Map from '../../components/map/map';
import { plural } from '../../utils/scripts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type MainPageCitiesProps = {
  offers: OfferPreviewType[];
}

function MainPageCities({offers}: MainPageCitiesProps) {
  const [hoveredCardId, setHoveredCardId] = useState<OfferPreviewType['id'] | null>(null);
  const city = useSelector((state: RootState) => state.city);

  function handleCardHover(id: OfferPreviewType['id'] | null) {
    setHoveredCardId(id);
  }

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} {plural(offers.length, 'place')} to stay in {city}</b>
          <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span className="places__sorting-type" tabIndex={0}>
              Popular
              <svg className="places__sorting-arrow" width="7" height="4">
                <use xlinkHref="#icon-arrow-select"></use>
              </svg>
            </span>
            <ul className="places__options places__options--custom places__options--opened">
              <li className="places__option places__option--active" tabIndex={0}>Popular</li>
              <li className="places__option" tabIndex={0}>Price: low to high</li>
              <li className="places__option" tabIndex={0}>Price: high to low</li>
              <li className="places__option" tabIndex={0}>Top rated first</li>
            </ul>
          </form>
          <div className="cities__places-list places__list tabs__content">
            {offers.map((offer) => (
              <Card key={offer.id} offer={offer} block='cities' onMouseHover={handleCardHover} />
            ))}
          </div>
        </section>
        <div className="cities__right-section">
          <Map offers={offers} block='cities__map' selectedOfferId={hoveredCardId}/>
        </div>
      </div>
    </div>
  );
}

export default MainPageCities;
