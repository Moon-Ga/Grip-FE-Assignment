import { useEffect, useState } from 'react';

import useAtom from 'hooks';
import { store } from 'libs/storejs';
import { favoriteListState } from 'states';

import Modal from 'ui/components/Modal';
import MovieItem from 'ui/components/MovieItem';
import { TriangleErrorIcon } from 'assets';

function Favorites() {
  const [favoriteList, setFavoriteList] =
    useAtom<TMovieItem[]>(favoriteListState);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const changeOrder = (id: string, to: number) => {
    const indexArr = favoriteList.map((favorite) => favorite.imdbID === id);
    const index = indexArr.indexOf(true);
    const newList = [...favoriteList];
    newList.splice(index, 1);
    newList.splice(to, 0, favoriteList[index]);
    setFavoriteList(newList);
    store.set('favorites', newList);
  };

  useEffect(() => {
    const favorites = store('favorites');
    setFavoriteList(favorites);
  }, [setFavoriteList]);

  return (
    <main className="h-full overflow-auto">
      <header className="sticky top-0 z-10 flex items-center w-full h-20 bg-white shadow-common">
        <img
          src="/logo.png"
          alt="favorite movies"
          className="absolute top-0 left-0 h-full"
        />
        <span className="mx-auto text-4xl">내 즐겨찾기</span>
      </header>
      <ul className="max-h-[calc(100%-5rem)] grid grid-flow-row auto-rows-[20rem] md:auto-rows-[16rem] lg:auto-rows-[16rem] p-6 gap-6 overflow-auto">
        {favoriteList.length ? (
          favoriteList.map((item: TMovieItem, idx: number) => {
            const key = `${item.imdbID}-favorite-${idx}`;
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
            <span className="text-3xl max-w-screen w-max">
              즐겨찾기 한 영화가 없습니다.
            </span>
          </section>
        )}
      </ul>
      {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} /> : null}
    </main>
  );
}

export default Favorites;
