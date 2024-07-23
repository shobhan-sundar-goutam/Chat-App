import { useUserProfileDetialsQuery } from '@/app/api/users';
import { useToast } from '@/components/ui/use-toast';
import {
  selectIsAuthenticated,
  setUserCredentials,
} from '@/features/userSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoutes = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const { data, isLoading, isError, error } = useUserProfileDetialsQuery('', {
    skip: isAuthenticated,
  });
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(isError, error);
  useEffect(() => {
    if (isError) {
      toast({
        variant: 'destructive',
        description: error.data.message ?? 'Oops! Something went wrong.',
      });
    } else if (data) {
      dispatch(setUserCredentials({ ...data }));
    }
  }, [data, isError]);

  return isLoading ? (
    'Loading...'
  ) : isAuthenticated || data ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
