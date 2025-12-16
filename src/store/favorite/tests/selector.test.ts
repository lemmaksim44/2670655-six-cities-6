import { selectFavorites, selectFavoritesLoadingStatus, selectFavoritesCount, selectIsFavorites, selectGroupedFavorites,} from '../selector';
import { RootState } from '../..';
import { City } from '../../../const';
import { OfferPreviewType } from '../../../types/offer-preview';

const parisOffer: OfferPreviewType = {
  id: '1',
  city: { name: City.Paris },
} as OfferPreviewType;

const amsterdamOffer: OfferPreviewType = {
  id: '2',
  city: { name: City.Amsterdam },
} as OfferPreviewType;

describe('favorite selectors', () => {
  const state = {
    favorites: {
      favorites: [parisOffer, amsterdamOffer],
      isFavoritesLoading: false,
    },
  } as RootState;

  it('should return favorites', () => {
    expect(selectFavorites(state)).toEqual([parisOffer, amsterdamOffer]);
  });

  it('should return loading status', () => {
    expect(selectFavoritesLoadingStatus(state)).toBe(false);
  });

  it('should return favorites count', () => {
    expect(selectFavoritesCount(state)).toBe(2);
  });

  it('should return isFavorites = true', () => {
    expect(selectIsFavorites(state)).toBe(true);
  });

  it('should group favorites by city and keep city order', () => {
    const grouped = selectGroupedFavorites(state);

    expect(grouped).toEqual({
      [City.Paris]: [parisOffer],
      [City.Amsterdam]: [amsterdamOffer],
    });
  });
});
