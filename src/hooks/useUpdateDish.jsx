import { showNotification } from '@mantine/notifications';
import useSWRMutation from 'swr/mutation';
import { ERROR_NOTIFY, SUCCESS_NOTIFY } from '../constants';
import usePrivateAxios from './usePrivateAxios';

const useUpdateItem = (id, { setError }) => {
  const customAxios = usePrivateAxios();
  const updateItem = async (url, { arg }) => {
    try {
      await customAxios({
        method: url.includes('update') ? 'patch' : 'post',
        url,
        data: arg,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
  const { trigger } = useSWRMutation(id === 'null' ? 'admin/add-a-dish' : 'admin/update-a-dish', updateItem, {
    onError: (error) => {
      setError(error);
      showNotification({
        ...ERROR_NOTIFY,
        message: error.message,
      });
    },
    onSuccess: () => {
      showNotification({
        ...SUCCESS_NOTIFY,
        message: 'Changes saved successfully!',
      });
    },
  });
  return ({ trigger });
};

export default useUpdateItem;
