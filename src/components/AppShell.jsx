import React, { useState } from 'react';
import { AppShell as MantineAppShell } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header';
import Orders from '../pages/Orders';
import Aside from './Aside';
import Catalogue from '../pages/Catalogue';
import EditAndAddModal from '../pages/Catalogue/components/EditAndAddModal';
import AuthForm from './AuthForm';
import ProtectedRoute from './ProtectedRoute';
// import PersistLogin from './PersistLogin';
import Transactions from '../pages/Transactions';
import TransactionDetailsModal from '../pages/Transactions/components/TransactionDetailsModal';
import AsideWrapper from '../pages/Aside';

function AppShell({ colorScheme, toggleColorScheme }) {
  const [open, setOpen] = useState(false);

  return (
    <MantineAppShell
      hiddenBreakpoint="xs"
      navbar={(
        <Navbar
          open={open}
          setOpen={setOpen}
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        />
    )}
      header={(
        <Header
          open={open}
          setOpen={setOpen}
        />
    )}
      aside={(<Aside />)}
    >
      <Routes>
        <Route path="/">
          {/* <Route element={<PersistLogin />}> */}
          <Route index element={<AuthForm />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/orders" element={<Orders />} />
            <Route path="catalogue" element={<Catalogue />}>
              <Route path="forms/:id" element={<EditAndAddModal />} />
            </Route>
            <Route path="transactions" element={<Transactions />}>
              <Route path=":orderId" element={<TransactionDetailsModal />} />
            </Route>
            <Route path="/summary" element={<AsideWrapper />} />
          </Route>
          {/* </Route> */}
        </Route>
      </Routes>
    </MantineAppShell>
  );
}

export default AppShell;
