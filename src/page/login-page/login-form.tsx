import { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLogin } from '../../store/user/action';
import { setServerError } from '../../store/error/action';
import { AppDispatchType } from '../../store';
import { selectServerError } from '../../store/error/selectors';

function LoginForm() {
  const dispatch = useDispatch<AppDispatchType>();
  const serverError = useSelector(selectServerError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validatePassword = (pwd: string) => /[A-Za-z]/.test(pwd) && /\d/.test(pwd);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (!validatePassword(password)) {
      dispatch(setServerError('Пароль должен содержать минимум одну английскую букву и одну цифру'));
      return;
    }

    if (serverError) {
      dispatch(setServerError(''));
    }

    dispatch(fetchLogin({ email, password }));
  };

  return (
    <form className="login__form form" onSubmit={handleSubmit}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button className="login__submit form__submit button" type="submit">
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;
