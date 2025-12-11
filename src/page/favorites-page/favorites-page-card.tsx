import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { AppDispatchType } from '../../store';
import { changeFavoriteStatus } from '../../store/favorite/action';
import { selectIsAuth } from '../../store/user/selectors';
import { AppRoute } from '../../const';
import { capitalize, getRating } from '../../utils/scripts';
import { OfferPreviewType } from '../../types/offer-preview';

type FavoritesPageCardProps = {
  offer: OfferPreviewType;
};

function FavoritesPageCardComponent({ offer }: FavoritesPageCardProps) {
  const { isPremium, id, previewImage, title, price, rating, type, isFavorite } = offer;

  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const handleFavoriteClick = () => {
    if (!isAuth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(changeFavoriteStatus({
      offerId: id,
      status: isFavorite ? 0 : 1,
    }));
  };

  return (
    <article className="favorites__card place-card">
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt={title}/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
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

const FavoritesPageCard = memo(FavoritesPageCardComponent);

export default FavoritesPageCard;
