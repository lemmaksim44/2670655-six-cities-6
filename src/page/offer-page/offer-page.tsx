import { OfferType } from '../../types/offer';
import { OfferPreviewType } from '../../types/offer-preview';
import { ReviewType } from '../../types/review';
import { useParams, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../../components/header/header';
import OfferPageDetails from './offer-page-details';
import OfferNearList from './offer-near-list';

type OfferPageProps = {
  offers: OfferType[];
  offersNearby: OfferPreviewType[];
  reviews: ReviewType[];
}

function OfferPage({offers, offersNearby, reviews}: OfferPageProps) {
  const {id} = useParams();
  const offer = offers.find((item) => item.id === id);

  if (!offer) {
    return <Navigate to={AppRoute.Page404} />;
  }

  const nearOffersNumber = 3;
  const offersStub = offersNearby
    .filter((item) => item.id !== offer.id)
    .slice(0, nearOffersNumber);

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--offer">
        <OfferPageDetails offer={offer} offersNearby={offersStub} reviews={reviews} />
        <OfferNearList offerNearby={offersStub} />
      </main>
    </div>
  );
}

export default OfferPage;
