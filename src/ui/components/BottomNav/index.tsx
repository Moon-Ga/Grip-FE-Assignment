import { FavoriteFilledIcon, SearchIcon } from 'assets';
import { Link } from 'react-router-dom';

function BottomNav() {
  return (
    <div className="sticky bottom-0 flex w-full h-24 bg-white">
      <Link to="/" className="flex items-center justify-center w-1/2 ">
        <SearchIcon className="h-full p-4" />
        <span className="hidden text-6xl sm:block">Search</span>
      </Link>
      <Link to="favorites" className="flex items-center justify-center w-1/2 ">
        <FavoriteFilledIcon className="h-full p-4 fill-pink-500" />
        <span className="hidden text-6xl sm:block">Favorite</span>
      </Link>
    </div>
  );
}

export default BottomNav;
