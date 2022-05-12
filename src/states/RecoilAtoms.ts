import { atom } from 'recoil';

const movieListState = atom({
  key: 'movieListState',
  default: [],
});

const favoriteListState = atom({
  key: 'favoriteListState',
  default: [],
});

export { movieListState, favoriteListState };
