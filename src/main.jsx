import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NotificationsProvider } from '@mantine/notifications';

import App from './App';
import AuthContextProvider from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
