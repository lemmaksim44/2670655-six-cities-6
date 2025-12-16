import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as redux from 'react-redux';

import Card from './card';
import { AppRoute } from '../../const';
import { changeFavoriteStatus } from '../../store/favorite/action';
import { OfferPreviewType } from '../../types/offer-preview';

const mockDispatch = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof redux>('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: vi.fn(),
  };
});

vi.mock('react-router-dom', async () => {
  const actual: typeof import('react-router-dom') = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

vi.mock('../../store/favorite/action', () => ({
  changeFavoriteStatus: vi.fn(() => ({ type: 'favorite/changeStatus' })),
}));

const mockOffer: OfferPreviewType = {
  id: '1',
  title: 'Test offer',
  type: 'apartment',
  price: 100,
  rating: 4,
  isFavorite: false,
  isPremium: true,
  previewImage: 'img.jpg',
  city: {
    name: 'Paris',
    location: { latitude: 0, longitude: 0, zoom: 10 },
  },
  location: { latitude: 0, longitude: 0, zoom: 10 },
};

const renderCard = (isAuth = true, onMouseHover?: (id: string | null) => void) => {
  vi.spyOn(redux, 'useSelector').mockReturnValue(isAuth);

  return render(
    <MemoryRouter>
      <Card
        offer={mockOffer}
        block="cities"
        onMouseHover={onMouseHover}
      />
    </MemoryRouter>
  );
};

describe('Component: Card', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockNavigate.mockClear();
  });

  it('renders offer information correctly', () => {
    renderCard();

    expect(screen.getByText('Test offer')).toBeInTheDocument();
    expect(screen.getByText('€100')).toBeInTheDocument();
    expect(screen.getByText('Apartment')).toBeInTheDocument();
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('calls onMouseHover on mouse enter and leave', () => {
    const onMouseHover = vi.fn();

    renderCard(true, onMouseHover);

    const card = screen.getByRole('article');

    fireEvent.mouseEnter(card);
    expect(onMouseHover).toHaveBeenCalledWith('1');

    fireEvent.mouseLeave(card);
    expect(onMouseHover).toHaveBeenCalledWith(null);
  });

  it('dispatches changeFavoriteStatus when user is authorized', () => {
    renderCard(true);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(changeFavoriteStatus).toHaveBeenCalledWith({
      offerId: '1',
      status: 1,
    });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('redirects to login when user is not authorized', () => {
    renderCard(false);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Login);
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
