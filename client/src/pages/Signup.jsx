import { useSignupMutation } from '@/app/api/users';
import PasswordInput from '@/components/PasswordInput';
import { GithubSvg } from '@/components/Svg/GithubSvg';
import { GoogleSvg } from '@/components/Svg/GoogleSvg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import {
  CircleUserRound,
  Loader2,
  LockKeyhole,
  Mail,
  User,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [signup, { isLoading }] = useSignupMutation();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(user);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { confirmPassword, ...userDataToSend } = user;
      const response = await signup(userDataToSend).unwrap();
      console.log(response);
      toast({
        description: response.message,
        className: 'text-primary',
      });
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
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    } else if (data.name.length < 3) {
      errors.name = 'Name must be at least 3 characters long';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email format';
    }

    if (!data.password.trim()) {
      errors.password = 'Password is required';
    } else if (data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!isValidPassword(data.password)) {
      errors.password =
        'Password must contain at least one capital letter, one number, and one special character';
    }

    if (!data.confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex = /(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/;
    return passwordRegex.test(password);
  };

  return (
    <div className='mt-[3rem] lg:mt-[2rem] p-5 flex justify-center items-center'>
      <div className='w-[360px] rounded-lg border bg-card text-card-foreground shadow-sm'>
        <div className='flex flex-col p-6 space-y-1 text-center'>
          <h3 className='font-semibold tracking-tight text-2xl'>
            Create an account
          </h3>
          <p className='text-sm text-muted-foreground'>
            Enter your email below to create your account
          </p>
        </div>
        <form encType='multipart/form-data' onSubmit={handleSubmit}>
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
              <Label className='flex gap-1 items-center' htmlFor='name'>
                <User size={16} />
                Name
              </Label>
              <Input
                id='name'
                placeholder='Name'
                type='text'
                name='name'
                value={user.name}
                required
                onChange={(e) =>
                  setUser({
                    ...user,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              {errors.name && (
                <p className='text-sm text-red-600'>{errors.name}</p>
              )}
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
            <div className='grid gap-2'>
              <Label
                className='flex gap-1 items-center'
                htmlFor='confirmPassword'
              >
                <LockKeyhole size={16} />
                Confirm Password
              </Label>
              <PasswordInput
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                name='confirmPassword'
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({
                    ...user,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              {errors.confirmPassword && (
                <p className='text-sm text-red-600'>{errors.confirmPassword}</p>
              )}
            </div>
            <div className='grid gap-2'>
              <Label
                className='required flex gap-1 items-center'
                htmlFor='picture'
              >
                <CircleUserRound size={16} />
                Picture
              </Label>
              <Input
                className='file:text-foreground file:cursor-pointer cursor-pointer'
                id='picture'
                type='file'
              />
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
                'Create account'
              )}
            </Button>
          </div>
        </form>
        <div className='flex items-center justify-center p-6 pt-0 text-xs text-muted-foreground'>
          Already have an account?
          <Link to='/login' className='text-primary px-1'>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
