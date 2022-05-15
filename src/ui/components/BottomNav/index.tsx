import { Link, useMatch } from 'react-router-dom';

import { FavoriteFilledIcon, SearchIcon } from 'assets';

function BottomNav() {
  const match = useMatch('/');
  return (
    <nav className="sticky bottom-0 flex w-full h-24 bg-white border-t-4 border-black">
      <Link
        to="/"
        className={`flex items-center justify-center w-1/2 border-r-2 border-black ${
          match ? 'bg-yellow-100' : 'bg-gray-100'
        }`}
      >
        <SearchIcon className="h-full p-4" />
        <span className="hidden text-6xl sm:block">검색</span>
      </Link>
      <Link
        to="favorites"
        className={`flex items-center justify-center w-1/2 border-l-2 border-black ${
          match ? 'bg-gray-100' : 'bg-yellow-100'
        }`}
      >
        <FavoriteFilledIcon className="h-full p-4 fill-yellow-400 drop-shadow-xl" />
        <span className="hidden text-6xl sm:block">즐겨찾기</span>
      </Link>
    </nav>
  );
}

export default BottomNav;
