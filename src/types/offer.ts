import { OfferPreviewType } from './offer-preview';
import { UserType } from './user';

export type OfferType = OfferPreviewType & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: UserType;
  images: string[];
  maxAdults: number;
};
