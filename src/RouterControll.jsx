import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute({ isAllowed, children }){
  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />
}

export function AdminRoute({ isAdmin, children }) {
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}