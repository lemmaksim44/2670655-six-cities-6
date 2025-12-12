import { useState } from 'react';
import { SortingOptions } from '../../const';

type MainPageCitiesFilterProps = {
  currentSortOption: SortingOptions;
  onChangeSort: (option: SortingOptions) => void;
};

function MainPageCitiesFilter({currentSortOption, onChangeSort}: MainPageCitiesFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleTypeClick() {
    setIsOpen(!isOpen);
  }

  function handleOptionClick(option: SortingOptions) {
    onChangeSort(option);
    setIsOpen(false);
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleTypeClick} style={{ userSelect: 'none' }}>
        {currentSortOption}
        <svg className="places__sorting-arrow" width="7" height="4" style={{ transform: `translateY(-50%) ${isOpen ? 'rotate(180deg)' : ''}`}}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className={`places__options places__options--custom ${isOpen && 'places__options--opened'}`}>
        {Object.values(SortingOptions).map((option) => (
          <li
            key={option}
            className={`places__option ${currentSortOption === option ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default MainPageCitiesFilter;
