import useSWR from 'swr';
import customAxios from '../api/axios';

const fetcher = (args) => customAxios.get(...args).then(({ data }) => data);
const useGetDishDetails = (id, options) => {
  const { data, isLoading, error } = useSWR(() => (id !== 'null' ? ['admin/get-dish-details', { params: { id } }] : null), fetcher, { ...options });
  return ({
    data,
    isLoading,
    error,
  });
};

export default useGetDishDetails;
