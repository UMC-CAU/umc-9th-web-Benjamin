import { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const auth = useContext(AuthContext);

  if (!auth?.isLoggedIn) {
    alert("로그인 후 접근 가능합니다.");
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
