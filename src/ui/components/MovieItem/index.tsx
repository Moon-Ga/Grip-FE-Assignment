import { FavoriteFilledIcon, NoImageImage } from 'assets';
import { useAtom } from 'hooks';
import { isFavorite, store } from 'libs/storejs';
import { favoriteListState } from 'states';

interface IMovieItemProps {
  item: IMovieItem;
}

function MovieItem({ item }: IMovieItemProps) {
  const [, setFavoriteList] = useAtom<IMovieItem[]>(favoriteListState);

  const toggleFavorite = () => {
    const info = {
      Title: item.Title,
      Year: item.Year,
      imdbID: item.imdbID,
      Type: item.Type,
      Poster: item.Poster,
    };

    if (!store(item.imdbID)) {
      store.set(item.imdbID, info);
      setFavoriteList((prev) => prev.concat([info]));
    } else {
      store.remove(item.imdbID);
      setFavoriteList((prev) => {
        const filtered = prev.filter(
          (listItem) => listItem.imdbID !== item.imdbID
        );
        return filtered;
      });
    }
  };

  return (
    <div className="flex w-full p-3 border-8 rounded-2xl">
      <div className="flex justify-center w-1/3">
        <img
          src={item.Poster === 'N/A' ? NoImageImage : item.Poster}
          alt={item.Title}
          className="object-contain h-full"
        />
      </div>
      <div className="flex flex-col justify-center w-2/3 ml-6 gap-y-5">
        <div className="text-4xl font-semibold h-[5.25rem] overflow-hidden text-ellipsis">
          {item.Title}
        </div>
        <div className="text-3xl">{item.Year}</div>
        <div className="text-3xl">{item.Type.toUpperCase()}</div>
      </div>
      <FavoriteFilledIcon
        onClick={toggleFavorite}
        className={`w-40 ${
          isFavorite(item.imdbID) ? 'fill-pink-500' : 'fill-white'
        }`}
      />
    </div>
  );
}

export default MovieItem;
