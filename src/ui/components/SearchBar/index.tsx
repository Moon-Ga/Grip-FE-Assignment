import { movieListState } from 'states';
import useRecoil from 'hooks';
import {
  FormEvent,
  MouseEventHandler,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import useSWR from 'swr';
import { baseUrl, fetcher, getParams } from 'libs/swr';

function SearchBar() {
  const [movieList, setMovieList, resetMovieList] = useRecoil(movieListState);

  const [inputValue, setInputValue] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const { data, error } = useSWR(
    [baseUrl, getParams(inputValue, '1')],
    fetcher
  );

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    if (inputRef.current !== null) {
      setInputValue(inputRef.current.value);
    }
  };

  const resetSearch = () => {
    if (inputRef.current !== null) {
      inputRef.current.value = '';
      setInputValue('');
      resetMovieList();
    }
  };

  useEffect(() => {
    console.log(data);
    if (data?.Search) {
      setMovieList(data.Search);
    }
  }, [data, setMovieList]);

  return (
    <div className="relative w-full h-16 shadow-2xl">
      <form className="w-full h-full bg-white" onSubmit={onSearch}>
        <span className="absolute left-0 p-3 text-4xl material-symbols-outlined">
          search
        </span>
        <input
          ref={inputRef}
          defaultValue={inputValue}
          type="text"
          placeholder="Search Movies"
          className="w-[calc(100%-14rem)] h-full text-3xl ml-16 focus:outline-black"
        />
        <span
          aria-hidden="true"
          onClick={resetSearch}
          className="absolute p-3 text-4xl right-24 material-symbols-outlined"
        >
          cancel
        </span>
        <button
          type="submit"
          onClick={onSearch}
          className="absolute right-0 h-full p-3 text-2xl"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
