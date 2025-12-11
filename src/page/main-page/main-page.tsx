import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/header/header';
import Spinner from '../../components/spinner/spinner';

import { AppDispatchType } from '../../store';
import { fetchOffers } from '../../store/offers/action';
import { selectOffersByCity, selectIsOffersLoading } from '../../store/offers/selectors';

import MainPageCitiesList from './main-page-cities-list';
import MainPageCities from './main-page-cities';
import MainPageEmpty from './main-page-empty';

function MainPage() {
  const dispatch = useDispatch<AppDispatchType>();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchOffers());
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const filteredOffers = useSelector(selectOffersByCity);

  const hasOffers = filteredOffers.length > 0;
  const isOffersLoading = useSelector(selectIsOffersLoading);

  let content;

  if (isOffersLoading) {
    content = <Spinner />;
  } else if (hasOffers) {
    content = <MainPageCities />;
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
