import './App.css';
import { Header } from './components/layout/header';
import { MainContentWrapper } from './components/layout/main-content-wrapper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DebtTable } from './components/debt-table/debt-table.tsx';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <MainContentWrapper>
        <DebtTable />
      </MainContentWrapper>
    </QueryClientProvider>
  );
}

export default App;
