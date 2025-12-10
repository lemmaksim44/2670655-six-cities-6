import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import OfferPageDetails from './offer-page-details';
import OfferNearList from './offer-near-list';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { AppDispatchType } from '../../store';
import { Fragment, useEffect } from 'react';
import { fetchOfferById, fetchNearbyOffers } from '../../store/offers/action';
import Spinner from '../../components/spinner/spinner';
import Page404 from '../page-404/page-404';
import Footer from '../../components/footer/footer';
import { sortByNearestOffers } from '../../utils/scripts';
import { fetchReviewsByOfferId } from '../../store/reviews/action';

function OfferPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatchType = useDispatch();

  const offer = useSelector((state: RootState) => state.offers.offer);
  const isOfferLoading = useSelector((state: RootState) => state.offers.isOfferLoading);

  const nearOffersLimit = 3;
  const offers = useSelector((state: RootState) => state.offers.offersNearby);
  const offersNear = offer ? sortByNearestOffers(offers, offer).slice(0, nearOffersLimit) : [];

  const reviews = useSelector((state: RootState) => state.reviews.reviews);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchReviewsByOfferId(id));
    }
  }, [dispatch, id]);

  return (
    <div className="page">
      {!offer && !isOfferLoading ? (
        <Page404/>
      ) : (
        <Fragment>
          <Header/>
          <main className="page__main page__main--offer">
            {isOfferLoading && (
              <Fragment>
                <Spinner/>
                <Footer/>
              </Fragment>
            )}
            {offer && (
              <Fragment>
                <OfferPageDetails offer={offer} offersNearby={offersNear} reviews={reviews}/>
                <OfferNearList offerNearby={offersNear}/>
              </Fragment>
            )}
          </main>
        </Fragment>
      )}
    </div>
  );
}

export default OfferPage;
