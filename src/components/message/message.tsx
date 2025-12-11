import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setServerError } from '../../store/error/action';
import { selectServerError } from '../../store/error/selectors';
import style from './message.module.css';

function Message() {
  const message = useSelector(selectServerError);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const timer = setTimeout(() => {
      if (isMounted) {
        dispatch(setServerError(null));
      }
    }, 5000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [dispatch]);

  return(
    <div className={style.messageContainer}>
      <p className={style.messageText}>{message}</p>
    </div>
  );
}

export default Message;
