import { ThemeProvider } from '@/components/ThemeToggler/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <main>
        <Navbar />
        <Outlet />
      </main>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
