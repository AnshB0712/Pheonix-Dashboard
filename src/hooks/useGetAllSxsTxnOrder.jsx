import useSWR from 'swr';
import usePrivateAxios from './usePrivateAxios';

const useGetAllSxsTxnOrder = () => {
  const customAxios = usePrivateAxios();
  const fetcher = (args) => customAxios.get(args).then(({ data }) => data);
  const {
    data,
    isLoading,
  } = useSWR('admin/sxs-txn-orders', fetcher);
  return ({
    data,
    isLoading,
  });
};

export default useGetAllSxsTxnOrder;
