import React from 'react';
import {
  IconBook, IconCoinRupee, IconLogin, IconReceipt, IconTornado,
} from '@tabler/icons';

export const NAVLINK_DATA = [
  {
    icon: <IconLogin size={18} />, color: 'red', label: 'Login', to: '/',
  },
  {
    icon: <IconBook size={18} />, color: 'blue', label: 'Orders', to: '/orders',
  },
  {
    icon: <IconTornado size={18} />, color: 'green', label: 'Catalogue', to: '/catalogue',
  },
  {
    icon: <IconCoinRupee size={18} />, color: 'teal', label: 'Transactions', to: '/transactions',
  },
  {
    icon: <IconReceipt size={18} />, color: 'salmon', label: 'Summary', to: '/summary',
  },
];

export const NATIVE_SELECT_DATA = [
  {
    label: 'Comfort Food',
    value: 'comfort food',
  },
  {
    label: 'Thali',
    value: 'thali',
  },
  {
    label: 'Punjabi',
    value: 'punjabi',
  },
  {
    label: 'Chinese',
    value: 'chinese',
  },
];

export const SUCCESS_NOTIFY = {
  title: 'Succesfull!',
  color: 'green',
  autoClose: 5000,
};

export const ERROR_NOTIFY = {
  title: 'ERROR!',
  color: 'red',
  autoClose: 5000,
};
