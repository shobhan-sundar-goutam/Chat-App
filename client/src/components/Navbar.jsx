import { useLogoutMutation } from '@/app/api/users';
import { useToast } from '@/components/ui/use-toast';
import {
  clearUserCredentials,
  selectIsAuthenticated,
} from '@/features/userSlice';
import { LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ModeToggle } from './ThemeToggler/ModeToggle';

const Navbar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [logout] = useLogoutMutation();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const response = await logout().unwrap();
      console.log(response);
      toast({
        description: response.message,
        className: 'text-primary',
      });

      dispatch(clearUserCredentials());
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        description: error.data.message ?? 'Oops! Something went wrong.',
      });
    }
    navigate('/login');
  };

  return (
    <div className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 max-w-screen-2xl justify-between items-center'>
        <Link
          to='/'
          className='text-[28px] text-primary'
          style={{ fontFamily: 'Pacifico, cursive' }}
        >
          Whisprrr...
        </Link>
        <span className='flex items-center gap-2'>
          <ModeToggle />
          {isAuthenticated && (
            <LogOut className='cursor-pointer' onClick={handleLogOut} />
          )}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
