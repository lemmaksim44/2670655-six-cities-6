import { favoritesReducer, FavoritesState } from '../reducer';
import { fetchFavorites, changeFavoriteStatus } from '../action';
import { OfferPreviewType } from '../../../types/offer-preview';

const mockFavorite: OfferPreviewType = {
  id: '1',
  isFavorite: true,
  city: { name: 'Paris' },
} as OfferPreviewType;

describe('favoritesReducer', () => {
  const initialState: FavoritesState = {
    favorites: [],
    isFavoritesLoading: false,
  };

  it('should return initial state', () => {
    expect(favoritesReducer(undefined, { type: 'UNKNOWN' }))
      .toEqual(initialState);
  });

  it('should set loading on fetchFavorites.pending', () => {
    const state = favoritesReducer(
      initialState,
      fetchFavorites.pending('', undefined)
    );

    expect(state.isFavoritesLoading).toBe(true);
  });

  it('should set favorites on fetchFavorites.fulfilled', () => {
    const state = favoritesReducer(
      initialState,
      fetchFavorites.fulfilled([mockFavorite], '', undefined)
    );

    expect(state.favorites).toEqual([mockFavorite]);
    expect(state.isFavoritesLoading).toBe(false);
  });

  it('should reset favorites on fetchFavorites.rejected', () => {
    const state = favoritesReducer(
      { ...initialState, favorites: [mockFavorite] },
      fetchFavorites.rejected(null, '', undefined)
    );

    expect(state.favorites).toEqual([]);
    expect(state.isFavoritesLoading).toBe(false);
  });

  it('should add favorite if isFavorite = true', () => {
    const state = favoritesReducer(
      initialState,
      changeFavoriteStatus.fulfilled(mockFavorite, '', {
        offerId: '1',
        status: 1,
      })
    );

    expect(state.favorites).toEqual([mockFavorite]);
  });

  it('should remove favorite if isFavorite = false', () => {
    const state = favoritesReducer(
      { ...initialState, favorites: [mockFavorite] },
      changeFavoriteStatus.fulfilled(
        { ...mockFavorite, isFavorite: false },
        '',
        { offerId: '1', status: 0 }
      )
    );

    expect(state.favorites).toEqual([]);
  });

  it('should ignore null payload', () => {
    const state = favoritesReducer(
      initialState,
      changeFavoriteStatus.fulfilled(null, '', {
        offerId: '1',
        status: 0,
      })
    );

    expect(state).toEqual(initialState);
  });
});
