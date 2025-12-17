import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MainPageCitiesFilter from '../main-page-cities-filter';
import { SortingOptions } from '../../../const';

const mockOnChangeSort = vi.fn();
const mockProps = {
  currentSortOption: SortingOptions.Popular,
  onChangeSort: mockOnChangeSort,
};

describe('MainPageCitiesFilter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders current sort option with active class', () => {
    render(<MainPageCitiesFilter {...mockProps} />);
    const activeOption = screen.getByText(mockProps.currentSortOption, { selector: '.places__option--active' });
    expect(activeOption).toBeInTheDocument();
  });

  it('opens and closes the dropdown on click', () => {
    render(<MainPageCitiesFilter {...mockProps} />);
    const sortType = screen.getByText(mockProps.currentSortOption, { selector: '.places__sorting-type' });
    const optionsList = screen.getByRole('list', { hidden: true });

    expect(optionsList).not.toHaveClass('places__options--opened');

    fireEvent.click(sortType);
    expect(optionsList).toHaveClass('places__options--opened');

    fireEvent.click(sortType);
    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  it('rotates arrow when dropdown opens', () => {
    render(<MainPageCitiesFilter {...mockProps} />);
    const sortType = screen.getByText(mockProps.currentSortOption, { selector: '.places__sorting-type' });
    const arrow = sortType.querySelector('.places__sorting-arrow') as SVGElement;

    expect(arrow.style.transform).toContain('translateY(-50%)');
    expect(arrow.style.transform).not.toContain('rotate(180deg)');

    fireEvent.click(sortType);
    expect(arrow.style.transform).toContain('rotate(180deg)');
  });

  it('calls onChangeSort for each option and closes dropdown', () => {
    render(<MainPageCitiesFilter {...mockProps} />);
    const sortType = screen.getByText(mockProps.currentSortOption, { selector: '.places__sorting-type' });
    const optionsList = screen.getByRole('list', { hidden: true });

    Object.values(SortingOptions).forEach((option) => {
      fireEvent.click(sortType);
      const optionElement = screen.getByText(option, { selector: '.places__option' });
      fireEvent.click(optionElement);

      expect(mockOnChangeSort).toHaveBeenCalledWith(option);
      expect(optionsList).not.toHaveClass('places__options--opened');
    });

    expect(mockOnChangeSort).toHaveBeenCalledTimes(Object.values(SortingOptions).length);
  });

  it('all list items have tabIndex=0', () => {
    render(<MainPageCitiesFilter {...mockProps} />);
    Object.values(SortingOptions).forEach((option) => {
      const li = screen.getByText(option, { selector: '.places__option' });
      expect(li).toHaveAttribute('tabIndex', '0');
    });
  });

  it('user can toggle dropdown multiple times and select different options', () => {
    render(<MainPageCitiesFilter {...mockProps} />);
    const sortType = screen.getByText(mockProps.currentSortOption, { selector: '.places__sorting-type' });
    const optionsList = screen.getByRole('list', { hidden: true });

    Object.values(SortingOptions).forEach((option) => {
      fireEvent.click(sortType);
      expect(optionsList).toHaveClass('places__options--opened');

      const optionElement = screen.getByText(option, { selector: '.places__option' });
      fireEvent.click(optionElement);

      expect(mockOnChangeSort).toHaveBeenCalledWith(option);
      expect(optionsList).not.toHaveClass('places__options--opened');
    });
  });
});
