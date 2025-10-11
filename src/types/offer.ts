import { OfferPreviewType } from './offer-preview';
import { UserType } from './user';

export type OfferType = OfferPreviewType & {
  description: string;
  bedrooms: number;
  goods: string[];
  user: UserType;
  images: string[];
  maxAdults: number;
};
