import './App.css';
import { Header } from './components/layout/header';
import { MainContentWrapper } from './components/layout/main-content-wrapper';

function App() {
  return (
    <>
      <Header />
      <MainContentWrapper>
        <>Main content wrapper</>
      </MainContentWrapper>
    </>
  );
}

export default App;
