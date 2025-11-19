import { OfferPreviewType } from '../types/offer-preview';
import { SortingOptions } from '../const';

export function sortOffers(offers: OfferPreviewType[], sortType: SortingOptions): OfferPreviewType[] {
  switch (sortType) {
    case SortingOptions.PriceLowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);

    case SortingOptions.PriceHighToLow:
      return [...offers].sort((a, b) => b.price - a.price);

    case SortingOptions.TopRated:
      return [...offers].sort((a, b) => b.rating - a.rating);

    default:
      return offers;
  }
}
