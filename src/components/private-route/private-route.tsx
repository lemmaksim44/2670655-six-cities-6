import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps) {
  if (props.authorizationStatus === AuthorizationStatus.Auth) {
    return(props.children);
  }
  return(<Navigate to={AppRoute.Login}/>);
}

export default PrivateRoute;
