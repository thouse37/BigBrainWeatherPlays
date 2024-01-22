import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

import UserAvatar from "./UserAvatar.jsx";
import LoginSVG from "./LoginSVG.jsx";
import FavoriteTeamsSVG from "./FavoriteTeamsSVG.jsx";
import EmailSubsSVG from "./EmailSubsSVG.jsx";
import CustomTeamsSVG from "./CustomTeamsSVG.jsx";
import LogoutSVG from "./LogoutSVG.jsx";

const getNavLinkClasses = (isActive) => {
  const baseClasses =
    "flex items-center gap-3 font-medium p-3 transition-all border border-transparent rounded-full focus:bg-blue-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2";
  const activeClasses =
    "text-blue-950 bg-blue-400 border-blue-400 rounded-full";
  const inactiveClasses =
    "text-blue-400 hover:text-blue-950 hover:bg-yellow-300 ";
  return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
};

function Header() {
  const { token, avatar, logout } = useAuth();

  return (
    <header className="bg-blue-950 sm:p-3 px-4 sm:col-start-2 flex flex-wrap justify-between items-center">
      <div className="ml-6 flex flex-row sm:space-y-0 sm:space-x-8 items-center">
        <NavLink
          to="/user/custom-teams"
          className={({ isActive }) => getNavLinkClasses(isActive)}
        >
          <CustomTeamsSVG />
          <span className="hidden xl:block">Custom Teams</span>
        </NavLink>
        <NavLink
          to="/user/favorite-teams"
          className={({ isActive }) => getNavLinkClasses(isActive)}
        >
          <FavoriteTeamsSVG />
          <span className="hidden xl:block">Favorite Teams</span>
        </NavLink>
        <NavLink
          to="/user/email-subscriptions"
          className={({ isActive }) => getNavLinkClasses(isActive)}
        >
          <EmailSubsSVG />
          <span className="hidden xl:block">Email Subscriptions</span>
        </NavLink>
      </div>
      <div className="mx-6 flex flex-row  sm:space-y-0 sm:space-x-8 items-center">
        {token ? (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) => getNavLinkClasses(isActive)}
              onClick={logout}
            >
              <LogoutSVG />
              <span className="hidden xl:block">Logout</span>
            </NavLink>
            <Link to="/user/profile" className="shrink-0 mr-10">
              <UserAvatar avatar={avatar} />
            </Link>
          </>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => getNavLinkClasses(isActive)}
          >
            <LoginSVG />
            <span className="hidden xl:block">Login</span>
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
