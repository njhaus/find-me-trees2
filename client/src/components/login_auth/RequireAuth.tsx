import { useLocation, Outlet, Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth"

const RequireAuth = () => {

    const { auth } = useAuth();
  const location = useLocation();

  return (
      auth?.accessToken 
          ? <Outlet />
          : <Navigate to='/' state={{from: location, redirect: true}} replace />
          
  )
}

export default RequireAuth
