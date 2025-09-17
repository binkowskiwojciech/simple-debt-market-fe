import './App.css';
import { Header } from './components/layout/header';
import { MainContentWrapper } from './components/layout/main-content-wrapper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <MainContentWrapper>
        <>Main content wrapper</>
      </MainContentWrapper>
    </QueryClientProvider>
  );
}

export default App;
