import customAxios from './axios';

const refreshAccessToken = async () => {
  const { data } = await customAxios.get('/refresh');
  return data.token;
};

export default refreshAccessToken;
