import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppTheme } from './theme';
import { HomeScreen } from './app/screens/Home';
import { Layout } from './app/layout';
import { Provider as UserProvider } from './user/context';
import './theme.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppTheme>
      <UserProvider>
        <Layout>
          <HomeScreen />
        </Layout>
      </UserProvider>
    </AppTheme>
  </React.StrictMode>,
);
