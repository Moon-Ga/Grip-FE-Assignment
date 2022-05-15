import useAtom from 'hooks';
import { modalContentState } from 'states';
import { isFavorite } from 'libs/storejs';
import { useDrag, useDrop } from 'react-dnd';

import { FavoriteFilledIcon, NoImageImage } from 'assets';

type TMovieItemProps = {
  idx: number;
  item: TMovieItem;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  changeOrder: (id: string, to: number) => void;
};

function MovieItem({
  idx,
  item,
  setIsModalOpen,
  changeOrder,
}: TMovieItemProps) {
  const [, setModalContent] = useAtom<TMovieItem>(modalContentState);
  const { Title, Year, imdbID, Type, Poster } = item;

  const toggleModal = () => {
    setIsModalOpen(true);
    setModalContent({
      Title,
      Year,
      imdbID,
      Type,
      Poster,
    });
  };

  const [{ isDragging }, dragRef, previewRef] = useDrag(() => ({
    type: 'favoriteItem',
    item: { id: imdbID, idx },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    end: (listitem, monitor) => {
      const { id: itemId, idx: itemIdx } = listitem;
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        changeOrder(itemId, itemIdx);
      }
    },
  }));

  const [, drop] = useDrop({
    accept: 'favoriteItem',
    hover: (listitem: { id: string; idx: number }) => {
      if (listitem.idx !== idx) {
        changeOrder(listitem.id, idx);
      }
    },
  });

  return (
    <li
      aria-hidden="true"
      ref={(node) => previewRef(dragRef(node))}
      onClick={toggleModal}
      className={`select-none relative flex w-full p-3 transition-all border-8 cursor-pointer shadow-common rounded-2xl hover:scale-[1.03] ${
        isDragging ? 'opacity-30' : ''
      } ${isFavorite(imdbID) ? 'border-yellow-200 shadow-yellow-700' : ''}`}
    >
      <section className="flex justify-center w-1/3">
        <img
          src={Poster === 'N/A' ? NoImageImage : Poster}
          alt={Title}
          className="object-contain h-full"
        />
      </section>
      <section
        ref={drop}
        className="flex flex-col justify-center w-2/3 ml-6 gap-y-5"
      >
        <div className="text-4xl font-semibold min-h-[2.75rem] max-h-[5.25rem] overflow-hidden text-ellipsis">
          {Title}
        </div>
        <div className="text-3xl">{Year}</div>
        <div className="text-3xl">{Type?.toUpperCase()}</div>
      </section>
      <FavoriteFilledIcon
        className={`absolute w-10 right-3 top-3 ${
          isFavorite(imdbID) ? 'fill-yellow-300 drop-shadow-lg' : 'fill-white'
        }`}
      />
    </li>
  );
}

export default MovieItem;
