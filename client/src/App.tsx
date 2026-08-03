
import { Toaster } from 'react-hot-toast';
import { AppRouter } from './routes/AppRouter';
import { useSession } from './hooks/useSession';

function App() {
  useSession(); // Initialize session listener
  
  return (
    <>
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'bg-background-secondary text-text-DEFAULT border border-border font-mono text-sm',
          style: {
            background: '#161B22',
            color: '#F8FAFC',
            border: '1px solid #30363D',
          },
          duration: 3000,
        }} 
      />
      <AppRouter />
    </>
  );
}

export default App;
