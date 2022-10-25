import { Routes, Route } from 'react-router-dom';

import { HomeScreen } from '@/app/screens/Home';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<HomeScreen fetchParam="products" title="Electronics" />} path="/*" />

      <Route element={<HomeScreen fetchParam="user/history" title="History" />} path="history" />
    </Routes>
  );
};
