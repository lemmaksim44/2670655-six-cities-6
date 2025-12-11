import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Spinner from '../../components/spinner/spinner';

import OfferPageDetails from './offer-page-details';
import OfferNearList from './offer-near-list';
import Page404 from '../page-404/page-404';

import { AppDispatchType } from '../../store';
import { fetchOfferById, fetchNearbyOffers } from '../../store/offers/action';
import { fetchReviewsByOfferId } from '../../store/reviews/action';
import { selectOffer, selectIsOfferLoading, selectOffersNearbyByOffer } from '../../store/offers/selectors';

function OfferPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatchType = useDispatch();

  const offer = useSelector(selectOffer);
  const isOfferLoading = useSelector(selectIsOfferLoading);

  const nearOffersLimit = 3;
  const offersNear = useSelector(selectOffersNearbyByOffer(offer, nearOffersLimit));

  useEffect(() => {
    let isMounted = true;

    if (id && isMounted) {
      dispatch(fetchOfferById(id));
      dispatch(fetchNearbyOffers(id));
      dispatch(fetchReviewsByOfferId(id));
    }

    return () => {
      isMounted = false;
    };
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
                <OfferPageDetails offer={offer} offersNearby={offersNear}/>
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
