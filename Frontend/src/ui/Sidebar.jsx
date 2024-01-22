import Logo from "./Logo.jsx";
import Navbar from "./Navbar.jsx";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="bg-blue-950 p-8 row-start-2 sm:row-span-2 flex flex-col items-center ">
      <Link to="/">
        <Logo />
      </Link>
      <Navbar />
    </aside>
  );
}

export default Sidebar;
