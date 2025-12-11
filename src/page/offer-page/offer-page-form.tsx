import { useState, Fragment, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ratings } from './const';
import { AppDispatchType } from '../../store';
import { sendReview } from '../../store/reviews/action';
import { fetchReviewsByOfferId } from '../../store/reviews/action';
import { selectIsSendingReview } from '../../store/reviews/selectors';

type OfferPageFormProps = {
  offerId: string;
};

function OfferPageForm({ offerId }: OfferPageFormProps) {
  const dispatch: AppDispatchType = useDispatch();
  const isSending = useSelector(selectIsSendingReview);

  const [formData, setFormData] = useState({
    rating: '',
    review: '',
  });

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    if (!formData.rating || formData.review.length < 50 || formData.review.length > 300) {
      return;
    }

    await dispatch(sendReview({
      offerId,
      rating: Number(formData.rating),
      comment: formData.review,
    })).unwrap();

    setFormData({ rating: '', review: '' });
    dispatch(fetchReviewsByOfferId(offerId));
  };

  const isSubmitDisabled =
    !formData.rating ||
    formData.review.length < 50 ||
    formData.review.length > 300 ||
    isSending;

  return (
    <form
      className="reviews__form form"
      onSubmit={(e) => {
        void handleSubmit(e);
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratings.map((star) => (
          <Fragment key={star.value}>
            <input
              onChange={handleFieldChange}
              className="form__rating-input visually-hidden"
              name="rating"
              value={star.value.toString()}
              id={`${star.value}-stars`}
              type="radio"
              checked={formData.rating === star.value.toString()}
              disabled={isSending}
            />
            <label
              htmlFor={`${star.value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={star.title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        onChange={handleFieldChange}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={formData.review}
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isSending}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled}>Submit</button>
      </div>
    </form>
  );
}

export default OfferPageForm;
