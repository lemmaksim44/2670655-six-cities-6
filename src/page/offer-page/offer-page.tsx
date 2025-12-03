import { OfferPreviewType } from '../../types/offer-preview';
import { ReviewType } from '../../types/review';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../../components/header/header';
import OfferPageDetails from './offer-page-details';
import OfferNearList from './offer-near-list';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { AppDispatchType } from '../../store';
import { Fragment, useEffect } from 'react';
import { fetchOfferById } from '../../store/offers/action';
import Spinner from '../../components/spinner/spinner';
import Page404 from '../page-404/page-404';
import Footer from '../../components/footer/footer';

type OfferPageProps = {
  offersNearby: OfferPreviewType[];
  reviews: ReviewType[];
}

function OfferPage({offersNearby, reviews}: OfferPageProps) {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatchType = useDispatch();

  const offer = useSelector((state: RootState) => state.offers.offer);
  const isOfferLoading = useSelector((state: RootState) => state.offers.isOfferLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferById(id));
    }
  }, [dispatch, id]);

  const nearOffersNumber = 3;
  const offersStub = offersNearby/*
    .filter((item) => item.id !== offer.id)
    .slice(0, nearOffersNumber);*/

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
                <OfferPageDetails offer={offer} offersNearby={offersStub} reviews={reviews}/>
                <OfferNearList offerNearby={offersStub}/>
              </Fragment>
            )}
          </main>
        </Fragment>
      )}
    </div>
  );
}

export default OfferPage;
