import store from 'storejs';

const isFavorite = (key: string) => {
  const favorites = store('favorites');
  if (favorites.length) {
    for (let i = 0; i < favorites.length; i += 1) {
      if (key === favorites[i].imdbID) {
        return true;
      }
    }
  }

  return false;
};

export { store, isFavorite };
