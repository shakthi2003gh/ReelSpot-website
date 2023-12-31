import { getUser } from "../state/user";
import RenderCards from "../components/renderCards";
import Pagination from "../components/pagination";
import { authRoute } from "./auth";

function watchList() {
  const { watchlist } = getUser() || {};

  return (
    <div className="watchlist-page">
      <Pagination />

      <h1>Watchlist</h1>

      {!!watchlist?.length ? (
        <RenderCards data={watchlist} />
      ) : (
        <div>No Movie / Tvshow in watchlist</div>
      )}
    </div>
  );
}

const WatchList = authRoute(watchList);
export default WatchList;
