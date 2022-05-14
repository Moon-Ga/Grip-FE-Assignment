import { FormEvent, useRef } from 'react';
import { CancelIcon, SearchIcon } from 'assets';
import { useAtom } from 'hooks';
import { movieListState, inputValueState, pageIndexState } from 'states';
import getMovieList from 'libs/axios';
import { totalResultsState } from 'states/RecoilAtoms';

function SearchBar() {
  const [movieList, setMovieList, resetMovieList] = useAtom(movieListState);
  const [inputValue, setInputValue] = useAtom(inputValueState);
  const [, setPageIndex] = useAtom(pageIndexState);
  const [, setTotalResults] = useAtom(totalResultsState);
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
    <div className="sticky top-0 flex justify-end w-full h-20 bg-black shadow-2xl">
      <form className="w-[calc(100%-7rem)] relative h-full" onSubmit={onSearch}>
        <SearchIcon className="absolute top-0 left-0 h-full p-3" />
        <input
          ref={inputRef}
          defaultValue={inputValue}
          type="text"
          placeholder="Search Movies"
          className="bg-white w-[calc(100%-7rem)] h-full px-20 text-5xl focus:outline-black"
        />
        <p className="absolute top-0 right-40">{movieList.length}</p>
        <CancelIcon
          onClick={resetSearch}
          className="absolute top-0 h-full p-3 cursor-pointer right-28"
        />
        <button
          type="submit"
          onClick={onSearch}
          className="absolute top-0 h-full p-3 text-3xl border-2 w-28 bg-cyan-500"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
