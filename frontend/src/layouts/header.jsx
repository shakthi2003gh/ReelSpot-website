import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import useMediaQuery from "../hooks/useMediaQuery";

export default function Header() {
  const theme = "light";
  const isNotMobileDevice = useMediaQuery(450);

  return (
    <header>
      <div className="container">
        <div className="group">
          {isNotMobileDevice && <MdMenu />}

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
