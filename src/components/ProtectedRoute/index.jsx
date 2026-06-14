import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { PATHS } from '../../router/paths';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return <Navigate to={PATHS.LOGIN} replace state={{ from: location }} />;
  }

  return children;
}
