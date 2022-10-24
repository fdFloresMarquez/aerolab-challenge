import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomeScreen } from '@/app/screens/Home';
import { History } from '@/app/screens/History';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<History />} path="history" />

      <Route element={<HomeScreen />} path="/*" />
    </Routes>
  );
};
