import { Link, Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, City } from '../../const';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType } from '../../store';
import Message from '../../components/message/message';
import LoginForm from './login-form';
import { setCity } from '../../store/offers/action';
import { selectIsError } from '../../store/error/selectors';
import { selectAuthorizationStatus } from '../../store/user/selectors';

function LoginPage() {
  const dispatch: AppDispatchType = useDispatch();
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const isError = useSelector(selectIsError);

  const cities: City[] = Object.values(City);
  const randomCity = cities[Math.floor(Math.random() * cities.length)];

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        {isError && <Message />}

        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Main}
                onClick={() => dispatch(setCity(randomCity))}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
