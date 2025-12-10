import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import { useSelector } from 'react-redux';
import { selectAuthorizationStatus } from '../../store/user/selectors';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute({children}: PrivateRouteProps) {
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Login}/>;
}

export default PrivateRoute;
