import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { AppTheme } from './theme';
import { Layout } from './app/layout';
import { Provider as UserProvider } from './user/context';
import './theme.css';
import { AppRouter } from './router/AppRouter';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppTheme>
      <UserProvider>
        <Layout>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </Layout>
      </UserProvider>
    </AppTheme>
  </React.StrictMode>,
);
