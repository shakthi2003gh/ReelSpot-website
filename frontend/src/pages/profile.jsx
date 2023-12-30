import { MdLogout } from "react-icons/md";
import { GoSun, GoMoon } from "react-icons/go";
import { useController, useFetch } from "../state";
import { getUser } from "../state/user";
import { authRoute } from "./auth";
import CardSection from "./../layouts/cardSection";
import avatar from "../assets/avatar.png";

function profile() {
  const user = getUser();
  const { theme, oppositeTheme } = useFetch((state) => state.ui);
  const { toggleTheme, logoutUser } = useController();

  if (!user) return <div>Login to view</div>;

  return (
    <div className="profile-page">
      <div className="user-details">
        <img src={avatar} alt="" title="profile image is disabled" />

        <div className="info">
          <div className="name">{user.name}</div>
          <div className="email">{user.email}</div>
        </div>
      </div>

      <div className="settings">
        <h2>quick actions</h2>

        <div className="actions">
          <button className="btn btn--primary" onClick={toggleTheme}>
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
      </div>

      <CardSection
        title="favorites"
        to="/favorites"
        data={user.favorites}
        notFoundMessage={"Add movie/tvshow to favorite"}
      />

      <CardSection
        title="watchlist"
        to="/watchlist"
        data={user.watchlist}
        notFoundMessage={"Add movie/tvshow to watchlist"}
      />
    </div>
  );
}

const Profile = authRoute(profile);
export default Profile;
