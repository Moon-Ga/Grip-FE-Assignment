import axios from 'axios';

const fetcher = async (url: string, params: object) => {
  let res = null;
  try {
    res = await axios.get(url, { params });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.request);
      console.error(error.response);
      console.error(error.config);
    }
  }

  return res?.data;
};
export default fetcher;
