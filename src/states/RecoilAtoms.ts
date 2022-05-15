import { atom } from 'recoil';

const movieListState = atom<TMovieItem[]>({
  key: 'movieListState',
  default: [],
});

const errorMessageState = atom<string>({
  key: 'errorMessageState',
  default: '검색 결과가 없습니다.',
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

const favoriteListState = atom<TMovieItem[]>({
  key: 'favoriteListState',
  default: [],
});

const modalContentState = atom<TMovieItem>({
  key: 'moalContentState',
  default: {} as TMovieItem,
});

export {
  movieListState,
  errorMessageState,
  inputValueState,
  totalResultsState,
  pageIndexState,
  favoriteListState,
  modalContentState,
};
