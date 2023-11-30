import { useState } from "react";
import { GoSun, GoMoon } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import NavLinks from "../components/navLinks";

export default function SideBar() {
  const [open, setOpen] = useState(true);
  const [theme, setTheme] = useState("light");

  return (
    <aside className="side-bar" data-open={open}>
      <nav>
        <NavLinks />
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
