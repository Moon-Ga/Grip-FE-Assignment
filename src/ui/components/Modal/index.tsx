import useAtom from 'hooks';
import { favoriteListState, modalContentState } from 'states';
import { isFavorite, store } from 'libs/storejs';

import { NoImageImage } from 'assets';

type TModalProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function Modal({ setIsModalOpen }: TModalProps) {
  const [modalContent] = useAtom<TMovieItem>(modalContentState);

  const [, setFavoriteList] = useAtom<TMovieItem[]>(favoriteListState);

  const { Title, Year, imdbID, Type, Poster } = modalContent;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleFavorite = () => {
    const info = [
      {
        Title,
        Year,
        imdbID,
        Type,
        Poster,
      },
    ];

    if (!isFavorite(imdbID)) {
      const updatedFavoriteList = store('favorites').concat(info);
      store.set('favorites', updatedFavoriteList);
      setFavoriteList((prev) => prev.concat(info));
    } else {
      const updatedFavoriteList = store('favorites').filter(
        (favorite: TMovieItem) => favorite.imdbID !== imdbID
      );
      store.set('favorites', updatedFavoriteList);
      setFavoriteList(updatedFavoriteList);
    }

    closeModal();
  };

  return (
    <div className="fixed top-0 left-0 z-10 w-full h-full">
      <div
        aria-hidden="true"
        className="w-full h-full bg-black opacity-80"
        onClick={closeModal}
      />
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ">
        <div className="relative flex justify-center animate-zoomin">
          <div className="absolute w-screen text-4xl text-center text-white -translate-x-1/2 -top-20 left-1/2">
            {isFavorite(imdbID)
              ? `즐겨찾기에서 제거합니다.`
              : '즐겨찾기에 추가합니다.'}
          </div>
          <img
            src={Poster === 'N/A' ? NoImageImage : Poster}
            alt={Title}
            className="object-contain min-h-[20rem] max-h-[50vh]"
          />
          <div className="absolute grid grid-flow-col text-2xl gap-x-8 w-[30rem] auto-cols-fr -bottom-28 justify-items-center ">
            <div
              aria-hidden="true"
              onClick={toggleFavorite}
              className="w-full h-full py-4 text-center cursor-pointer rounded-2xl bg-emerald-500 shadow-block shadow-emerald-500"
            >
              {isFavorite(imdbID) ? '즐겨찾기 제거' : '즐겨찾기'}
            </div>
            <div
              aria-hidden="true"
              onClick={closeModal}
              className="w-full h-full py-4 text-center bg-red-500 cursor-pointer rounded-2xl shadow-block shadow-red-500"
            >
              취소
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
