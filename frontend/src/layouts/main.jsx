import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <nav className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            TV Reviews
          </Link>
          <Link to="/tv-shows" className="btn btn-ghost">
            TV Shows
          </Link>
        </div>
        <div className="flex-none"></div>
      </nav>
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
