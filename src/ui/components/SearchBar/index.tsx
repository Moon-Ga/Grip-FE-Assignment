import { FormEvent, useRef } from 'react';

import useAtom from 'hooks';
import {
  movieListState,
  inputValueState,
  pageIndexState,
  errorMessageState,
  totalResultsState,
} from 'states';
import getMovieList from 'libs/axios';

import { CancelIcon, SearchIcon } from 'assets';

function SearchBar() {
  const [, setMovieList, resetMovieList] =
    useAtom<TMovieItem[]>(movieListState);
  const [, setErrorMessage] = useAtom<string>(errorMessageState);
  const [inputValue, setInputValue] = useAtom<string>(inputValueState);
  const [, setPageIndex] = useAtom<number>(pageIndexState);
  const [, setTotalResults] = useAtom<number>(totalResultsState);

  const inputRef = useRef<HTMLInputElement>(null);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current !== null && inputRef.current.value !== inputValue) {
      resetMovieList();
      setPageIndex(1);
      setInputValue(inputRef.current.value);
      getMovieList(inputRef.current.value, 1).then((res) => {
        if (res.Search) {
          setMovieList(res.Search);
          setTotalResults(res.totalResults);
        } else if (res.Error) {
          switch (res.Error) {
            case 'Too many results.':
              setErrorMessage('검색 결과가 너무 많습니다.');
              break;
            case 'Movie not found!':
              setErrorMessage('검색 결과가 없습니다. ');
              break;
            default:
              setErrorMessage('오류가 발생하였습니다.');
          }
        }
      });
    }
  };

  const resetSearch = () => {
    if (inputRef.current !== null) {
      inputRef.current.value = '';
    }
  };

  return (
    <header className="sticky top-0 z-10 flex justify-end w-full h-20 bg-white shadow-common">
      <img src="/logo.png" alt="favorite movies" className="h-full" />
      <form className="relative w-full h-full" onSubmit={onSearch}>
        <SearchIcon className="absolute top-0 left-0 h-full p-3" />
        <input
          ref={inputRef}
          defaultValue={inputValue}
          type="text"
          placeholder="Search Movies"
          className="bg-white w-[calc(100%-7rem)] h-full px-20 text-4xl focus:outline-black"
        />
        <CancelIcon
          onClick={resetSearch}
          className="absolute top-0 h-full p-3 cursor-pointer right-28"
        />
        <button
          type="submit"
          onClick={onSearch}
          className="absolute top-0 h-full p-3 text-3xl text-white bg-black w-28"
        >
          Search
        </button>
      </form>
    </header>
  );
}

export default SearchBar;
