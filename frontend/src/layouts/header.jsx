import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useController, useFetch } from "../state";
import { getUser } from "../state/user";
import Search from "./../components/search";

export default function Header() {
  const user = getUser();
  const { ui, mediaQuery } = useFetch((state) => state);
  const { toggleMenuOpen } = useController();
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
          <Link to="/profile" className="profile">
            <span className="name">{user.name}</span> <FaUserAlt />
          </Link>
        ) : (
          <Link className="btn btn--primary" to="/auth?method=signin">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
