import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useSelector, useDispatch } from 'react-redux';
import { setCity } from '../../store/offers/action';
import { City } from '../../const';
import { selectCity } from '../../store/offers/selectors';

const cities = Object.values(City);

const MainPageCitiesList: FC = () => {
  const dispatch = useDispatch();
  const city = useSelector(selectCity);

  return (
    <Fragment>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((c) => (
              <li className="locations__item" key={c}>
                <Link
                  className={`locations__item-link tabs__item ${city === c ? 'tabs__item--active' : ''}`}
                  to={AppRoute.Main}
                  onClick={(event) => {
                    event.preventDefault();
                    dispatch(setCity(c as City));
                  }}
                >
                  <span>{c}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Fragment>
  );
};

export default MainPageCitiesList;
