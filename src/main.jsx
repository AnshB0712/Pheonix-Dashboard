import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NotificationsProvider } from '@mantine/notifications';

import App from './App';
import AuthContextProvider from './context/AuthContext';
import OrderContextProvider from './context/OrdersContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <NotificationsProvider>
          <OrderContextProvider>
            <App />
          </OrderContextProvider>
        </NotificationsProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
