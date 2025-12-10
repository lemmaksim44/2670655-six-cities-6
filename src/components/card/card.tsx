import { OfferPreviewType } from '../../types/offer-preview';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { capitalize, getRating } from '../../utils/scripts';
import { memo } from 'react';

type CardProps = {
  offer: OfferPreviewType;
  block: string;
  onMouseHover?: (id: OfferPreviewType['id'] | null) => void;
}

function Card({offer, block, onMouseHover}: CardProps) {
  const {isPremium, id, previewImage, title, price, rating, type} = offer;

  function mouseEnter() {
    onMouseHover?.(id);
  }

  function mouseLeave() {
    onMouseHover?.(null);
  }

  return (

    <article
      className={`${block}__card place-card`}
      {...(onMouseHover
        ? {
          onMouseEnter: mouseEnter,
          onMouseLeave: mouseLeave,
        }
        : {})}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${block}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title}/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRating(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}

export default memo(Card);
