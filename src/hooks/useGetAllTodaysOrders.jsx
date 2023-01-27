import useSWR from 'swr';
import usePrivateAxios from './usePrivateAxios';

const useGetAllTodaysOrders = () => {
  const customAxios = usePrivateAxios();
  const fetcher = (arg) => customAxios.get(arg).then(({ data }) => data);
  const { data, isLoading, error } = useSWR('/admin/get-all-today-orders', fetcher);
  return ({
    data,
    isLoading,
    error,
  });
};

export default useGetAllTodaysOrders;
