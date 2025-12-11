import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import FavoritesPageEmpty from './favorites-page-empty';
import FavoritesPageList from './favorites-page-list';
import { useSelector } from 'react-redux';
import { selectIsFavorites, selectGroupedFavorites } from '../../store/favorite/selector';

function FavoritesPage() {
  const hasOffers = useSelector(selectIsFavorites)
  const groupCitiesOffer = useSelector(selectGroupedFavorites);

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
