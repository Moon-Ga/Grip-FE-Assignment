import { Outlet } from 'react-router-dom';
import BottomNav from 'ui/components/BottomNav';

function MainLayout() {
  return (
    <div className="relative flex flex-col w-full h-full bg-black max-w-7xl">
      <Outlet />
      <BottomNav />
    </div>
  );
}
export default MainLayout;
