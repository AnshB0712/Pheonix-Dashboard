import { showNotification } from '@mantine/notifications';
import useSWRMutation from 'swr/mutation';
import { ERROR_NOTIFY } from '../constants';
import usePrivateAxios from './usePrivateAxios';

const useChangeOrderStatus = () => {
  const customAxios = usePrivateAxios();
  const changeStatus = async (url, { arg }) => {
    try {
      await customAxios.patch(url, {
        id: arg.id,
        deliveryTag: arg.deliveryTag,
        orderStatus: 'SXS',
      });
    } catch (error) {
      throw new Error(error);
    }
  };
  const { trigger, isMutating } = useSWRMutation('/admin/change-order-status', changeStatus, {
    onError: (error) => {
      showNotification({
        ...ERROR_NOTIFY,
        message: error.message,
      });
    },
  });
  return ({ trigger, isLoading: isMutating });
};

export default useChangeOrderStatus;
