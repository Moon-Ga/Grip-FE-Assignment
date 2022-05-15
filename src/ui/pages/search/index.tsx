import { useEffect, useState } from 'react';

import useAtom from 'hooks';
import {
  errorMessageState,
  inputValueState,
  movieListState,
  pageIndexState,
  totalResultsState,
} from 'states';
import getMovieList from 'libs/axios';

import MovieItem from 'ui/components/MovieItem';
import SearchBar from 'ui/components/SearchBar';
import Modal from 'ui/components/Modal';
import { TriangleErrorIcon } from 'assets';

function Search() {
  const [movieList, setMovieList] = useAtom<TMovieItem[]>(movieListState);
  const [errorMessage] = useAtom<string>(errorMessageState);
  const [totalResults] = useAtom<number>(totalResultsState);
  const [pageIndex, setPageIndex] = useAtom<number>(pageIndexState);
  const [inputValue] = useAtom<string>(inputValueState);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [target, setTarget] = useState<HTMLSpanElement | null>(null);

  const changeOrder = () => {
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      await getMovieList(inputValue, pageIndex + 1).then((res) => {
        if (res.Search) {
          setMovieList((prev) => prev.concat(res.Search));
          setPageIndex((prev) => prev + 1);
        }
      });
    };

    let observer: IntersectionObserver;
    if (target) {
      const onIntersect = async (
        [entry]: IntersectionObserverEntry[],
        observing: IntersectionObserver
      ) => {
        if (entry.isIntersecting) {
          setIsLoading(true);
          observing.unobserve(entry.target);
          await fetchData();
          setIsLoading(false);
        }
      };
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [inputValue, pageIndex, setMovieList, setPageIndex, target]);

  return (
    <main className="h-full overflow-auto">
      <SearchBar />
      <ul className="grid grid-flow-row auto-rows-[20rem] md:auto-rows-[16rem] lg:auto-rows-[16rem] p-6 gap-6 overflow-auto">
        {movieList.length ? (
          movieList.map((item: TMovieItem, idx: number) => {
            const key = `${item.imdbID}-movie-${idx}`;
            return (
              <MovieItem
                key={key}
                idx={idx}
                item={item}
                setIsModalOpen={setIsModalOpen}
                changeOrder={changeOrder}
              />
            );
          })
        ) : (
          <section className="absolute flex flex-col items-center w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 animate-pulse">
            <TriangleErrorIcon className="w-1/4 mx-auto fill-yellow-500" />
            <span className="text-3xl max-w-screen w-max">{errorMessage}</span>
          </section>
        )}
        {movieList.length && movieList.length < Number(totalResults) ? (
          <figure
            ref={setTarget}
            className="flex items-center justify-center w-full"
          >
            {isLoading ? (
              <span className="block w-40 h-40 border-8 rounded-full animate-spin border-t-blue-600" />
            ) : null}
          </figure>
        ) : null}
      </ul>
      {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} /> : null}
    </main>
  );
}

export default Search;
