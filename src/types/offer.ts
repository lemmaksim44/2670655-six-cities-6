import { OfferPreviewType } from "./offer-preview";
import { HostType } from "./host";

export type OfferType = OfferPreviewType & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: HostType;
  images: string[];
  maxAdults: number;
};
