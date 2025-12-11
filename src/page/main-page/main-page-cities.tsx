import Card from '../../components/card/card';
import { OfferPreviewType } from '../../types/offer-preview';
import { useState, useCallback } from 'react';
import Map from '../../components/map/map';
import { plural } from '../../utils/scripts';
import { useSelector } from 'react-redux';
import MainPageCitiesFilter from './main-page-cities-filter';
import { SortingOptions } from '../../const';
import { selectCity, selectSortedOffers } from '../../store/offers/selectors';


function MainPageCities() {
  const [hoveredCardId, setHoveredCardId] = useState<OfferPreviewType['id'] | null>(null);
  const [currentSortOption, setCurrentSortOption] = useState(SortingOptions.Popular);
  const city = useSelector(selectCity);
  const sortedOffers = useSelector(selectSortedOffers(currentSortOption));

  const handleCardHover = useCallback((id: OfferPreviewType['id'] | null) => {
    setHoveredCardId(id);
  }, []);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{sortedOffers.length} {plural(sortedOffers.length, 'place')} to stay in {city}</b>
          <MainPageCitiesFilter currentSortOption={currentSortOption} onChangeSort={setCurrentSortOption}/>
          <div className="cities__places-list places__list tabs__content">
            {sortedOffers.map((offer) => (
              <Card key={offer.id} offer={offer} block='cities' onMouseHover={handleCardHover} />
            ))}
          </div>
        </section>
        <div className="cities__right-section">
          <Map offers={sortedOffers} block='cities__map' selectedOfferId={hoveredCardId}/>
        </div>
      </div>
    </div>
  );
}

export default MainPageCities;
