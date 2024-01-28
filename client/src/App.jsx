import { ThemeProvider } from '@/components/ThemeToggler/ThemeProvider';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Navbar />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
