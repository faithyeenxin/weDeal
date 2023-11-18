import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { CssBaseline } from '@mui/material/';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { dealSlice } from './features/api/dealSlice';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider api={dealSlice}>
      <CssBaseline />
      <App />
    </ApiProvider>
  </React.StrictMode>
);
