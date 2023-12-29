import { GoSun, GoMoon } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { useFetch, useController } from "../state";
import { getUser } from "../state/user";
import NavLinks from "../components/navLinks";

export default function SideBar() {
  const user = getUser();
  const { isMenuOpen, theme, oppositeTheme } = useFetch((state) => state.ui);
  const { toggleTheme, logoutUser } = useController();

  return (
    <aside className="side-bar" data-open={isMenuOpen}>
      <nav>
        <NavLinks />
      </nav>

      <div className="actions">
        <button className="btn toggle" onClick={toggleTheme}>
          {theme === "dark" ? <GoSun /> : <GoMoon />}
          <span>{oppositeTheme + "mode"}</span>
        </button>

        <button
          className="btn btn--danger"
          onClick={logoutUser}
          disabled={!user}
        >
          <MdLogout />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
