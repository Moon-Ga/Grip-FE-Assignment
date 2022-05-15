import { TriangleErrorIcon } from 'assets';

function NotFound() {
  return (
    <div className="h-full overflow-auto">
      <header className="sticky top-0 z-10 flex items-center w-full h-20 bg-white shadow-common">
        <img
          src="/logo.png"
          alt="favorite movies"
          className="absolute top-0 left-0 h-full"
        />
        <span className="mx-auto text-4xl">잘못된 접근</span>
      </header>
      <section className="absolute flex flex-col items-center w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 animate-pulse">
        <TriangleErrorIcon className="w-1/4 mx-auto fill-red-500" />
        <span className="text-4xl max-w-screen w-max">404 Not Found</span>
        <span className="text-3xl max-w-screen w-max">
          주소를 확인해주세요.
        </span>
      </section>
    </div>
  );
}

export default NotFound;
