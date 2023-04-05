import { Navigate } from 'react-router-dom';

function LoginCheckRoute({ component: Component,props, redirectTo, ...rest }) {
  const isAuthenticated = localStorage.getItem('token') ? true : false;
  if(isAuthenticated){
    return <Navigate to={redirectTo}/>
  } else{
    return <Component {...props}/>
  }
}

export default LoginCheckRoute;