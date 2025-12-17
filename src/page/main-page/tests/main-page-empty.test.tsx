import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import MainPageEmpty from '../main-page-empty';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

describe('MainPageEmpty component', () => {
  it('should display "No places to stay available" with the correct city', () => {
    const mockCity = 'Amsterdam';
    (useSelector as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockCity);

    render(<MainPageEmpty />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(
      screen.getByText(`We could not find any property available at the moment in ${mockCity}`)
    ).toBeInTheDocument();
  });

  it('should correctly display for a different city', () => {
    const mockCity = 'Paris';
    (useSelector as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockCity);

    render(<MainPageEmpty />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(
      screen.getByText(`We could not find any property available at the moment in ${mockCity}`)
    ).toBeInTheDocument();
  });
});
