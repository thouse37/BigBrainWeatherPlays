import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

function AppLayout() {
  return (
    <div className="grid grid-cols-1  grid-rows-[.3fr,1fr,1fr] h-screen gap-1 gap-blue-400 sm:grid-cols-[275px_minmax(0,1fr)] sm:grid-rows-[100px_minmax(0,1fr)] md:grid-cols-[300px_minmax(0,1fr)] md:grid-rows-[100px_minmax(0,1fr)] lg:grid-cols-[350px_minmax(0,1fr)] lg:grid-rows-[100px_minmax(0,1fr)]">
      <Sidebar />
      <Header />
      <main className="bg-blue-400 p-6 sm:col-start-2 sm:row-start-2">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
