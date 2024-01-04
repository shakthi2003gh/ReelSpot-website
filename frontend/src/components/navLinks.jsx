import { useId } from "react";
import { NavLink } from "react-router-dom";
import { useController, useFetch } from "../state";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { MdLocalMovies, MdOutlineLocalMovies } from "react-icons/md";
import { PiTelevision, PiTelevisionFill } from "react-icons/pi";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { MdSearch } from "react-icons/md";
import { BiSolidSearchAlt2 } from "react-icons/bi";
import { RiUser3Fill, RiUser3Line } from "react-icons/ri";

export default function NavLinks() {
  const { mediaQuery } = useFetch((state) => state);
  const { toggleMenuOpen } = useController();
  const { isMobile, isTablet, isDesktop } = mediaQuery;

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
      label: "tvshows",
      Icon: PiTelevision,
      IconFill: PiTelevisionFill,
      to: "/tvshows",
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
    {
      id: useId(),
      label: "search",
      Icon: MdSearch,
      IconFill: BiSolidSearchAlt2,
      to: "/search",
    },
    {
      id: useId(),
      label: "profile",
      Icon: RiUser3Line,
      IconFill: RiUser3Fill,
      to: "/profile",
    },
  ];

  const filter = (_, i) => (isMobile ? ![3, 4].includes(i) : i < 5);

  const handleClick = () => {
    if (isTablet && !isDesktop) toggleMenuOpen();
  };

  return (
    <ul className="nav-links">
      {links.filter(filter).map(({ id, label, to, Icon, IconFill }) => (
        <li key={id} onClick={handleClick}>
          <NavLink to={to}>
            <Icon />
            <IconFill />
            <span>{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
