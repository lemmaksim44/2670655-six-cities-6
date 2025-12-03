import { Link, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useState } from 'react';
import { AuthorizationStatus } from '../../const';
import { FormEvent } from 'react';
import { fetchLogin } from '../../store/user/action';
import { AppDispatchType } from '../../store';
import Message from '../../components/message/message';
import { City } from '../../const';
import { setCity } from '../../store/offers/action';

function LoginPage() {
  const dispatch: AppDispatchType = useDispatch();

  const authorizationStatus = useSelector((state: RootState) => state.user.authorizationStatus);
  const isError = useSelector((state: RootState) => state.error.serverError !== null);

  const cities: City[] = Object.values(City);
  const randomCity = cities[Math.floor(Math.random() * cities.length)];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(fetchLogin({ email, password }));
  };

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
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
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
