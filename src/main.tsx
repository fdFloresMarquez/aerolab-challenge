import React from 'react';
import ReactDOM from 'react-dom/client';

import './theme.css';
import { Layout } from './app/layout';
import { AppTheme } from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppTheme>
      <Layout>
        <span>Hello faken</span>
      </Layout>
    </AppTheme>
  </React.StrictMode>,
);
