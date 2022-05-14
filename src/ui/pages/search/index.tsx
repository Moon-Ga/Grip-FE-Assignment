import {
  inputValueState,
  movieListState,
  pageIndexState,
  totalResultsState,
} from 'states';
import MovieItem from 'ui/components/MovieItem';
import SearchBar from 'ui/components/SearchBar';
import { useAtom } from 'hooks';
import { useEffect, useState } from 'react';
import getMovieList from 'libs/axios';

function Search() {
  const [movieList, setMovieList] = useAtom(movieListState);
  const [totalResults] = useAtom(totalResultsState);
  const [pageIndex, setPageIndex] = useAtom(pageIndexState);
  const [inputValue] = useAtom(inputValueState);

  const [isLoading, setIsLoading] = useState(false);
  const [target, setTarget] = useState<HTMLSpanElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await getMovieList(inputValue, pageIndex + 1).then((res) => {
        if (res.Search) {
          setMovieList((prev) => prev.concat(res.Search));
          setPageIndex(pageIndex + 1);
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
          observing.observe(entry.target);
          setIsLoading(false);
        }
      };
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [inputValue, pageIndex, setMovieList, setPageIndex, target]);

  return (
    <div className="h-full overflow-auto">
      <SearchBar />
      <div className="grid grid-flow-row auto-rows-[20rem] md:auto-rows-[16rem] lg:auto-rows-[16rem] p-6 gap-6 overflow-auto">
        {movieList.map((item: IMovieItem, idx: number) => {
          const key = `${item.imdbID}-movie-${idx}`;
          return <MovieItem key={key} item={item} />;
        })}
        {movieList.length && movieList.length < Number(totalResults) ? (
          <div
            ref={setTarget}
            className="flex items-center justify-center w-full"
          >
            {isLoading ? (
              <span className="block w-40 h-40 border-8 rounded-full animate-spin border-t-blue-600" />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Search;
