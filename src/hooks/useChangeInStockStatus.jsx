import { showNotification } from '@mantine/notifications';
import useSWRMutation from 'swr/mutation';
import usePrivateAxios from './usePrivateAxios';

const useChangeInStockStatus = () => {
  const customAxios = usePrivateAxios();
  const changeStatus = async (url, { arg }) => {
    try {
      await customAxios.patch(url, { id: arg.id, inStock: arg.inStock });
    } catch (error) {
      throw new Error(error);
    }
  };
  const { trigger, isMutating } = useSWRMutation('admin/change-instock-status', changeStatus, {
    onError: (error) => {
      showNotification({
        title: 'ERROR',
        message: error.message,
        color: 'red',
        autoClose: 5000,
      });
    },
  });
  return ({ trigger, isLoading: isMutating });
};

export default useChangeInStockStatus;
