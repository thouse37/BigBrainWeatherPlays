import { NavLink } from "react-router-dom";
import TodaySVG from "./TodaySVG.jsx";
import BaseballSVG from "./BaseballSVG.jsx";
import FootballSVG from "./FootballSVG.jsx";
import HomeSVG from "./HomeSVG.jsx";
import SettingSVG from "./SettingSVG.jsx";
import Footer from "./Footer.jsx";
import { getNavLinkClasses } from "../utils/getNavLinkClasses.js";

function MainNav() {
  return (
    <>
      <nav>
        <ul className="flex flex-col gap-2 sm:mt-16">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => getNavLinkClasses(isActive)}
            >
              <HomeSVG />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/todays-games"
              className={({ isActive }) => getNavLinkClasses(isActive)}
            >
              <TodaySVG />
              <span>Today's Games</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/nfl"
              className={({ isActive }) => getNavLinkClasses(isActive)}
            >
              <FootballSVG />
              <span>NFL Games</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mlb"
              className={({ isActive }) => getNavLinkClasses(isActive)}
            >
              <BaseballSVG />
              <span>MLB Games</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) => getNavLinkClasses(isActive)}
            >
              <SettingSVG />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <Footer />
    </>
  );
}

export default MainNav;
