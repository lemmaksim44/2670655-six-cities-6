import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setServerError } from '../../store/error/action';
import { selectServerError } from '../../store/error/selectors';
import style from './message.module.css';

function Message() {
  const message = useSelector(selectServerError);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setServerError(null));
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return(
    <div className={style.messageContainer}>
      <p className={style.messageText}>{message}</p>
    </div>
  );
}

export default Message;
