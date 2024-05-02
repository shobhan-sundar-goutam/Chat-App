import { useUserProfileDetialsQuery } from '@/app/api/users';
import {
  selectIsAuthenticated,
  setUserCredentials,
} from '@/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoutes = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const { data, isLoading } = useUserProfileDetialsQuery();
  const dispatch = useDispatch();

  console.log(data);

  data && dispatch(setUserCredentials({ ...data }));

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
