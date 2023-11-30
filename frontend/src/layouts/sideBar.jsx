import { useId, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { MdLocalMovies, MdOutlineLocalMovies } from "react-icons/md";
import { PiTelevision, PiTelevisionFill } from "react-icons/pi";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { GoSun, GoMoon } from "react-icons/go";
import { MdLogout } from "react-icons/md";

export default function SideBar() {
  const [open, setOpen] = useState(true);
  const [theme, setTheme] = useState("light");

  const links = [
    {
      id: useId(),
      label: "home",
      Icon: AiOutlineHome,
      IconFill: AiFillHome,
      to: "/",
    },
    {
      id: useId(),
      label: "movies",
      Icon: MdOutlineLocalMovies,
      IconFill: MdLocalMovies,
      to: "/movies",
    },
    {
      id: useId(),
      label: "tv",
      Icon: PiTelevision,
      IconFill: PiTelevisionFill,
      to: "/tv",
    },
    {
      id: useId(),
      label: "favorites",
      Icon: IoMdHeartEmpty,
      IconFill: IoMdHeart,
      to: "/favorites",
    },
    {
      id: useId(),
      label: "watchlist",
      Icon: IoBookmarkOutline,
      IconFill: IoBookmark,
      to: "/watchlist",
    },
  ];

  return (
    <aside className="side-bar" data-open={open}>
      <nav>
        <ul>
          {links.map(({ id, label, to, Icon, IconFill }) => (
            <li key={id}>
              <NavLink to={to}>
                <Icon />
                <IconFill />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="actions">
        <button className="btn toggle">
          {theme === "dark" ? <GoSun /> : <GoMoon />}
          <span>{theme === "dark" ? "lightmode" : "darkmode"}</span>
        </button>

        <button className="btn btn--danger">
          <MdLogout />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
