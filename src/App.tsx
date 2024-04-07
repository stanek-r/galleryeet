import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { GTomyProvider, NOT_FOUND_ROUTE, PRIVACY_POLICY_ROUTE, withColumnPage } from 'gtomy-lib';
import { GalleryeetMenu } from './components/GalleryeetMenu';
import { GalleryeetFooter } from './components/GalleryeetFooter';

function App() {
  return (
    <GTomyProvider MenuComponent={GalleryeetMenu} FooterComponent={GalleryeetFooter}>
      <Routes>
        <Route path="/" element={withColumnPage(HomePage)} />
        {PRIVACY_POLICY_ROUTE}
        {NOT_FOUND_ROUTE}
      </Routes>
    </GTomyProvider>
  );
}

export default App;
