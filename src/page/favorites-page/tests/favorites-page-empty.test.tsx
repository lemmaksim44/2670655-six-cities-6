import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FavoritesPageEmpty from '../favorites-page-empty';

describe('FavoritesPageEmpty component', () => {
  it('renders empty favorites page with correct texts', () => {
    render(<FavoritesPageEmpty />);

    expect(
      screen.getByText('Nothing yet saved.')
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Save properties to narrow down search or plan your future trips.'
      )
    ).toBeInTheDocument();
  });

  it('renders visually hidden title for accessibility', () => {
    render(<FavoritesPageEmpty />);

    expect(
      screen.getByRole('heading', { name: /favorites \(empty\)/i })
    ).toBeInTheDocument();
  });
});
