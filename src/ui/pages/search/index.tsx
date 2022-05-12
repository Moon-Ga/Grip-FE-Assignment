import { movieListState } from 'states';
import MovieItem from 'ui/components/MovieItem';
import SearchBar from 'ui/components/SearchBar';
import useAtom from 'hooks';

function Search() {
  const [movieList] = useAtom(movieListState);

  return (
    <div className="h-full overflow-auto">
      <SearchBar />
      <div className="grid grid-flow-row auto-rows-[20rem] p-6 gap-6 h-[calc(100%-4rem)] overflow-auto bg-gray-300">
        {movieList.map((item: IMovieItem, idx: number) => {
          const key = `${item.imdbID}-${idx}`;
          return <MovieItem item={item} key={key} />;
        })}
      </div>
    </div>
  );
}

export default Search;
