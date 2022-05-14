import axios from 'axios';
import { baseUrl, getParams } from './getParams';

const getMovieList = async (s: string, page: number) => {
  const res = await axios.get(baseUrl, { params: getParams(s, page) });

  return res?.data;
};
export default getMovieList;
