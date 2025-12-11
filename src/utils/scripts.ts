import { OfferPreviewType } from '../types/offer-preview';

const MAX_RATING = 5;
const EARTH_RADIUS_KM = 6371;

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
  const year = date.getUTCFullYear();

  return `${month} ${year}`;
}

export function plural(count: number, word: string): string {
  return count === 1 ? word : `${word}s`;
}

export function getRating(rating: number): string {
  const rounded = Math.round(rating);
  const clamped = Math.min(Math.max(rounded, 0), MAX_RATING);
  return `${(clamped / MAX_RATING) * 100}%`;
}

export function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}

export function sortByNearestOffers(
  offers: OfferPreviewType[],
  referenceOffer: OfferPreviewType
): OfferPreviewType[] {
  const { latitude, longitude } = referenceOffer.location;

  return offers
    .map((offer) => ({
      ...offer,
      distance: getDistance(
        latitude,
        longitude,
        offer.location.latitude,
        offer.location.longitude
      )
    }))
    .sort((a, b) => a.distance - b.distance)
    .map((offerWithDistance) => {
      const { distance, ...rest } = offerWithDistance;
      void distance;
      return rest;
    });
}
