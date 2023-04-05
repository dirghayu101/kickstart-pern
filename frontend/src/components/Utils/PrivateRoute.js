import { Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component, redirectTo, ...rest }) {
  const isAuthenticated = localStorage.getItem('token') ? true : false;
  if(isAuthenticated){
    return <Component/>
  } else{
    return <Navigate to={redirectTo}/>
  }
}

export default PrivateRoute;