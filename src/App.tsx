import { Route, Routes } from 'react-router-dom';
import MainLayout from 'ui/layouts/MainLayout';
import Favorites from './ui/pages/favorites';
import Search from './ui/pages/search';

function App() {
  return (
    <div
      className="flex items-center justify-center w-screen h-screen"
      style={{ background: 'linear-gradient(135deg, #ff008a, #ff462b)' }}
    >
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Search />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
