import { selectUser } from '@/features/userSlice';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector(selectUser);
  return (
    <div>
      <h1>Welcome {user.name}</h1>
    </div>
  );
};

export default Home;
