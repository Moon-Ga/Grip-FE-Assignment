const baseUrl = 'http://www.omdbapi.com';

const getParams = (s: string, page: string) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const params = {
    apiKey,
    s,
    page,
  };
  return params;
};
export { getParams, baseUrl };
