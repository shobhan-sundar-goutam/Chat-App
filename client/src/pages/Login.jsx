import { useLoginMutation } from '@/app/api/users';
import PasswordInput from '@/components/PasswordInput';
import { GithubSvg } from '@/components/Svg/GithubSvg';
import { GoogleSvg } from '@/components/Svg/GoogleSvg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { setUserCredentials } from '@/features/userSlice';
import { Loader2, LockKeyhole, Mail } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [login, { isLoading }] = useLoginMutation();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validateForm(user);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await login(user).unwrap();
      console.log(response);
      toast({
        description: response.message,
        className: 'text-primary',
      });

      dispatch(setUserCredentials({ ...response.data }));

      setUser({ email: '', password: '' });

      navigate('/');
    } catch (error) {
      console.log(error);
      toast({
        variant: 'destructive',
        description: error.data.message ?? 'Oops! Something went wrong.',
      });
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    }

    if (!data.password.trim()) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  return (
    <div className='mt-[3rem] lg:mt-[2rem] p-5 flex justify-center items-center'>
      <div className='w-[360px] rounded-lg border bg-card text-card-foreground shadow-sm'>
        <div className='flex flex-col p-6 space-y-1 text-center'>
          <h3 className='font-semibold tracking-tight text-2xl'>Sign In</h3>
          <p className='text-sm text-muted-foreground'>
            Enter your email below to sign in to your account
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='p-6 pt-0 grid gap-4'>
            <div className='grid grid-cols-2 gap-6'>
              <button className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'>
                <GithubSvg />
                Github
              </button>
              <button className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'>
                <GoogleSvg />
                Google
              </button>
            </div>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t'></span>
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>
            <div className='grid gap-2'>
              <Label
                className='required flex gap-1 items-center'
                htmlFor='email'
              >
                <Mail size={16} />
                Email
              </Label>
              <Input
                id='email'
                placeholder='mail@example.com'
                type='email'
                name='email'
                value={user.email}
                required
                onChange={(e) =>
                  setUser({
                    ...user,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              {errors.email && (
                <p className='text-sm text-red-600'>{errors.email}</p>
              )}
            </div>
            <div className='grid gap-2'>
              <Label className='flex gap-1 items-center' htmlFor='password'>
                <LockKeyhole size={16} />
                Password
              </Label>
              <PasswordInput
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                name='password'
                value={user.password}
                onChange={(e) =>
                  setUser({
                    ...user,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              {errors.password && (
                <p className='text-sm text-red-600'>{errors.password}</p>
              )}
            </div>
          </div>
          <div className='flex items-center p-6 pt-0'>
            <Button
              disabled={isLoading}
              type='submit'
              className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full'
            >
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please wait...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </div>
        </form>
        <div className='flex items-center justify-center p-6 pt-0 text-xs text-muted-foreground'>
          Don't have an account?
          <Link to='/signup' className='text-primary px-1'>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
