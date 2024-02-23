import { Link } from 'react-router-dom';
import { ModeToggle } from './ThemeToggler/ModeToggle';

const Navbar = () => {
  return (
    <div className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 max-w-screen-2xl justify-between items-center'>
        <Link
          to='/'
          className='text-[28px] text-primary'
          style={{ fontFamily: 'Pacifico, cursive' }}
        >
          Whispr
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
