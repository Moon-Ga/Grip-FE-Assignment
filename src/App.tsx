import { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import { store } from 'libs/storejs';

import MainLayout from 'ui/layouts/MainLayout';
import NotFound from 'ui/pages/notfound';
import Favorites from './ui/pages/favorites';
import Search from './ui/pages/search';

function App() {
  useEffect(() => {
    if (!store('favorites')) {
      store.set('favorites', []);
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-main">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Search />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
