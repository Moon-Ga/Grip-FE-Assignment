import { useAtom } from 'hooks';
import { getFavorites } from 'libs/storejs';
import { useEffect } from 'react';
import { favoriteListState } from 'states';
import MovieItem from 'ui/components/MovieItem';

function Favorites() {
  const [favoriteList, setFavoriteList] = useAtom(favoriteListState);

  useEffect(() => {
    const favorites = getFavorites();
    setFavoriteList(favorites);
  }, [setFavoriteList]);

  return (
    <div className="h-full overflow-auto">
      <div className="sticky top-0 flex justify-end w-full h-20 bg-black shadow-2xl" />
      <div className="grid grid-flow-row auto-rows-[18vmax] p-6 gap-6 overflow-auto">
        {favoriteList.map((item: IMovieItem, idx: number) => {
          const key = `${item.imdbID}-favorite-${idx}`;
          return <MovieItem key={key} item={item} />;
        })}
      </div>
    </div>
  );
}

export default Favorites;
