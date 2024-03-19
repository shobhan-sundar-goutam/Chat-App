import { useVerifyQuery } from '@/app/api/users';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';

const Verify = () => {
  const { token } = useParams();
  const response = useVerifyQuery(token);

  if (response.status === 'pending') {
    return <div>Loading...</div>;
  } else if (response.status === 'rejected') {
    return (
      <div className='mt-40 mx-20'>
        <Alert variant='destructive' className='text-xl'>
          <div className='flex items-center gap-2'>
            <AlertCircle className='h-5 w-5' />
            <AlertTitle className='text-lg'>Error</AlertTitle>
          </div>
          <AlertDescription className='text-lg ps-8'>
            {response.error.data.message || 'Something went wrong'}
            <br />
            <Button className='mt-2'>Verify Yourself</Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  } else {
    return <Navigate to='/' replace={true} />;
  }
};

export default Verify;
