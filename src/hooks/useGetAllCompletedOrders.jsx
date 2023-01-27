import useSWR from 'swr';
import usePrivateAxios from './usePrivateAxios';

const useGetAllCompletedOrders = (orderType = 7) => {
  const customAxios = usePrivateAxios();
  const fetcher = (args) => customAxios.get(args).then(({ data }) => data);
  const {
    data,
    isLoading,
  } = useSWR(`admin/get-completed-orders/${orderType}`, fetcher);
  return ({
    data,
    isLoading,
  });
};

export default useGetAllCompletedOrders;
