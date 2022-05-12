import NoImage from 'assets/no-image.svg';

interface IMovieItemProps {
  item: IMovieItem;
}

function MovieItem({ item }: IMovieItemProps) {
  console.log(item);
  return (
    <div className="flex w-full p-3 border-2">
      <div className="flex justify-center w-1/3">
        <img
          src={item.Poster === 'N/A' ? NoImage : item.Poster}
          alt={item.Title}
          className="object-contain h-full"
        />
      </div>
      <div className="flex flex-col justify-center w-2/3 ml-6 gap-y-5">
        <div className="text-4xl font-semibold ">{item.Title}</div>
        <div className="text-3xl">{item.Year}</div>
        <div className="text-3xl">{item.Type.toUpperCase()}</div>
      </div>
    </div>
  );
}

export default MovieItem;
