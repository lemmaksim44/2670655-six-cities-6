import MainPageCitiesList from './main-page-cities-list';
import MainPageCities from './main-page-cities';
import Header from '../../components/header/header';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatchType } from '../../store';
import { fetchOffers } from '../../store/action';
import { useEffect } from 'react';
import MainPageEmpty from './main-page-empty';
import Spinner from '../../components/spinner/spinner';


function MainPage() {
  const dispatch = useDispatch<AppDispatchType>();

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  const offers = useSelector((state: RootState) => state.offers);
  const city = useSelector((state: RootState) => state.city);
  const filteredOffers = offers.filter((offer) => offer.city.name === city.toString());
  const hasOffers = filteredOffers.length > 0;
  const isOffersLoading = useSelector((state: RootState) => state.isOffersLoading);

  let content;

  if (isOffersLoading) {
    content = <Spinner />;
  } else if (hasOffers) {
    content = <MainPageCities offers={filteredOffers} />;
  } else {
    content = <MainPageEmpty />;
  }

  return (
    <div className="page page--gray page--main ">
      <Header/>

      <main className={`page__main page__main--index ${hasOffers ? '' : 'page__main--index-empty'}`}>
        <MainPageCitiesList/>
        {content}
      </main>
    </div>
  );
}

export default MainPage;
