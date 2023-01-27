import useSWR from 'swr';
import customAxios from '../api/axios';

const fetcher = (args) => customAxios.get(...args).then(({ data }) => data);
const useGetOrders = (orderStatus, orderType) => {
  const { data, isLoading, error } = useSWR(['/admin/todays-orders', { params: { orderStatus, orderType } }], fetcher, {
    shouldRetryOnError: false,
  });
  return {
    data, isLoading, error,
  };
};

export default useGetOrders;
