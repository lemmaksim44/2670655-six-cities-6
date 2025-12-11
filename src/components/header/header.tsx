import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppDispatchType } from '../../store';
import { AppRoute } from '../../const';
import { fetchLogout } from '../../store/user/action';
import { fetchFavorites } from '../../store/favorite/action';
import Message from '../message/message';
import { selectIsError } from '../../store/error/selectors';
import { selectUserInfo, selectIsAuth } from '../../store/user/selectors';
import { selectFavoritesCount, selectIsFavorites } from '../../store/favorite/selector';

function Header() {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUserInfo);
  const isError = useSelector(selectIsError);
  const isFavorite = useSelector(selectIsFavorites);
  const favoritesCount = useSelector(selectFavoritesCount);
  const dispatch = useDispatch<AppDispatchType>();

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, isAuth]);

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  return(
    <Fragment>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuth ? (
                  <Fragment>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__user-name user__name">{user?.email}</span>
                        {isFavorite && <span className="header__favorite-count">{favoritesCount}</span>}
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to={AppRoute.Main} onClick={handleLogout}>
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </Fragment>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {isError && <Message/>}
    </Fragment>
  );
}

export default Header;
