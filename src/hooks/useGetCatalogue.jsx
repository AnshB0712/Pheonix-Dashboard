import useSWR from 'swr';
import usePrivateAxios from './usePrivateAxios';

const useGetCatalogue = () => {
  const customAxios = usePrivateAxios();
  const fetcher = (args) => customAxios.get(args).then(({ data }) => data);
  const {
    isLoading, data, error, mutate,
  } = useSWR('/admin/get-catalogue', fetcher);
  return ({
    data,
    isLoading,
    error,
    mutate,
  });
};

export default useGetCatalogue;
