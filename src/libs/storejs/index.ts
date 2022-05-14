import store from 'storejs';

const getFavorites = () => {
  const favorites = store.keys().map((item) => store(item));
  return favorites as never[];
};

const isFavorite = (key: string) => {
  if (store.get(key)) {
    return true;
  }
  return false;
};

export { store, getFavorites, isFavorite };
