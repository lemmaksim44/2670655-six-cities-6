import { OfferType } from '../../types/offer';
import { OfferPreviewType } from '../../types/offer-preview';
import { ReviewType } from '../../types/review';
import { capitalize, getRating } from '../../utils/scripts';
import OfferPageReviewsList from './offer-page-reviews-list';
import OfferPageForm from './offer-page-form';
import Map from '../../components/map/map';

type OfferPageDetailsProps = {
  offer: OfferType;
  offersNearby: OfferPreviewType[];
  reviews: ReviewType[];
}

function OfferPageDetails({offer, offersNearby, reviews}: OfferPageDetailsProps) {
  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {offer.images.map((image) => (
            <div className="offer__image-wrapper" key={image}>
              <img className="offer__image" src={image} alt="Photo studio" />
            </div>
          ))}
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {offer.isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">
              {offer.title}
            </h1>
            <button className="offer__bookmark-button button" type="button">
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{ width: getRating(offer.rating) }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{offer.rating}</span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {capitalize(offer.type)}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              {offer.bedrooms} Bedrooms
            </li>
            <li className="offer__feature offer__feature--adults">
              Max {offer.maxAdults} adults
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">&euro;{offer.price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {offer.goods.map((good) => (
                <li className="offer__inside-item" key={`${good}`}>
                  {good}
                </li>
              ))}
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div className={`offer__avatar-wrapper ${offer.user.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                <img className="offer__avatar user__avatar" src={offer.user.avatarUrl} width="74" height="74" alt="Host avatar"/>
              </div>
              <span className="offer__user-name">
                {offer.user.name}
              </span>
              {offer.user.isPro && (
                <span className="offer__user-status">
                  Pro
                </span>
              )}
            </div>
            <div className="offer__description">
              <p className="offer__text">
                {offer.description}
              </p>
            </div>
          </div>
          <section className="offer__reviews reviews">
            <OfferPageReviewsList reviews={reviews} />
            <OfferPageForm/>
          </section>
        </div>
      </div>
      <Map currentOffer={offer} offers={offersNearby} block='offer__map' />
    </section>
  );
}

export default OfferPageDetails;
