import { useVerifyMutation } from '@/app/api/users';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { setUserCredentials } from '@/features/userSlice';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Verify = () => {
  const [error, setError] = useState({ isError: false, message: null });
  const { token } = useParams();
  const [verify, { isLoading }] = useVerifyMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function verifyToken() {
    try {
      const response = await verify(token).unwrap();
      console.log(response);
      dispatch(setUserCredentials({ ...response }));
      return navigate('/');
    } catch (error) {
      console.log(error);
      setError({
        isError: true,
        message: error?.data?.message || 'Something went wrong',
      });
    }
  }

  return error.isError ? (
    <div className='mt-40 mx-20'>
      <Alert variant='destructive' className='text-xl'>
        <div className='flex items-center gap-2'>
          <AlertCircle className='h-5 w-5' />
          <AlertTitle className='text-lg'>Error</AlertTitle>
        </div>
        <AlertDescription className='text-lg ps-8'>
          {error.message ||
            'Something went wrong. Please click on the url again or refresh the page'}
          <br />
          <Link to='/login'>
            <Button className='mt-2'>Go to Sign In</Button>
          </Link>
        </AlertDescription>
      </Alert>
    </div>
  ) : (
    <div className='mt-[10rem] lg:mt-[10rem] px-5 flex justify-center items-center'>
      <Card className='w-[350px]'>
        <CardHeader className='text-center'>
          <CardTitle>Verify Yourself!</CardTitle>
          <CardDescription>
            Please verify yourself by clicking on the button.
          </CardDescription>
        </CardHeader>
        <CardFooter className='flex justify-between'>
          <Button disabled={isLoading} onClick={verifyToken}>
            {isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Please wait...
              </>
            ) : (
              'Verify'
            )}
          </Button>
          <Link to='/login'>
            <Button disabled={isLoading} variant='outline'>
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Please wait...
                </>
              ) : (
                'Go to Sign In'
              )}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Verify;
