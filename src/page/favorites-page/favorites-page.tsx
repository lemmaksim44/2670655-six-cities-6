import { useSelector } from 'react-redux';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Spinner from '../../components/spinner/spinner';
import FavoritesPageEmpty from './favorites-page-empty';
import FavoritesPageList from './favorites-page-list';
import { selectIsFavorites, selectGroupedFavorites, selectFavoritesLoadingStatus } from '../../store/favorite/selector';

function FavoritesPage() {
  const hasOffers = useSelector(selectIsFavorites);
  const groupCitiesOffer = useSelector(selectGroupedFavorites);
  const isLoading = useSelector(selectFavoritesLoadingStatus);

  return (
    <div className={`page ${!hasOffers && 'page--favorites-empty'}`}>
      <Header/>

      {isLoading ? (
        <Spinner/>
      ) : (
        <main className={`page__main page__main--favorites ${!hasOffers && 'page__main--favorites-empty'}`}>
          <div className="page__favorites-container container">
            {hasOffers ? <FavoritesPageList offers={groupCitiesOffer}/> : <FavoritesPageEmpty/>}
          </div>
        </main>
      )}

      <Footer/>
    </div>
  );
}

export default FavoritesPage;
