import { OfferPreviewType } from '../../types/offer-preview';
import Card from '../../components/card/card';

type OfferNearListProps = {
  offerNearby: OfferPreviewType[];
}

function OfferNearList({offerNearby}: OfferNearListProps) {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {offerNearby.map((offer) => (
            <Card key={offer.id} offer={offer} block='near-places' />
          ))}
        </div>
      </section>
    </div>
  );
}

export default OfferNearList;
