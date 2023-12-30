import { getUser } from "../state/user";
import { authRoute } from "./auth";
import RenderCards from "./../components/renderCards";
import Pagination from "./../components/pagination";

function favorites() {
  const { favorites } = getUser() || {};

  return (
    <div className="favorite-page">
      <Pagination />

      <h1>Favorites</h1>

      {!!favorites?.length ? (
        <RenderCards data={favorites} />
      ) : (
        <div>No Movie / Tvshow in favorites</div>
      )}
    </div>
  );
}

const Favorites = authRoute(favorites);
export default Favorites;
