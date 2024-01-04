import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { GoSun, GoMoon } from "react-icons/go";
import { useController, useFetch } from "../state";
import { getUser } from "../state/user";
import Search from "./../components/search";

export default function Header() {
  const user = getUser();
  const { ui, mediaQuery } = useFetch((state) => state);
  const { toggleMenuOpen, toggleTheme } = useController();

  const { theme } = ui;
  const isNotMobileDevice = mediaQuery.isTablet;

  const handleEnter = (e) => {
    if (e.keyCode === 13) toggleMenuOpen();
  };

  return (
    <header>
      <div className="container">
        <div className="group">
          {isNotMobileDevice && (
            <MdMenu
              tabIndex={0}
              onClick={toggleMenuOpen}
              onKeyDown={handleEnter}
            />
          )}

          <Link to="/" className="logo">
            <img src={`/logo-${theme}.svg`} alt="Home" />
          </Link>
        </div>

        {isNotMobileDevice && <Search />}

        {user ? (
          isNotMobileDevice ? (
            <Link to="/profile" className="profile">
              <span className="name">{user.name}</span> <FaUserAlt />
            </Link>
          ) : (
            <button className="btn toggle" onClick={toggleTheme}>
              {theme === "dark" ? <GoSun /> : <GoMoon />}
            </button>
          )
        ) : (
          <Link className="btn btn--primary" to="/auth?method=signin">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
