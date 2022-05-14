import { atom } from 'recoil';

const movieListState = atom<IMovieItem[]>({
  key: 'movieListState',
  default: [],
});

const inputValueState = atom<string>({ key: 'inputValueState', default: '' });

const pageIndexState = atom<number>({
  key: 'pageIndexState',
  default: 0,
});

const totalResultsState = atom<number>({
  key: 'totalResultsState',
  default: 0,
});

const favoriteListState = atom<IMovieItem[]>({
  key: 'favoriteListState',
  default: [],
});

export {
  movieListState,
  inputValueState,
  totalResultsState,
  pageIndexState,
  favoriteListState,
};
