const baseUrl = process.env.REACT_APP_BASEURL as string;

const getParams = (s: string, page: number) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const params = {
    apiKey,
    s,
    page,
  };
  return params;
};
export { baseUrl, getParams };
