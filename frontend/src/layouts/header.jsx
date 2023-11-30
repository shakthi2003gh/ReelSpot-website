import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { useController, useFetch } from "../state";
import useMediaQuery from "../hooks/useMediaQuery";

export default function Header() {
  const { theme } = useFetch((state) => state.ui);
  const { toggleMenuOpen } = useController();
  const isNotMobileDevice = useMediaQuery(450);

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

        <Link className="btn btn--primary" to="/auth?method=signin">
          Login
        </Link>
      </div>
    </header>
  );
}
