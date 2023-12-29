import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { useController } from "../state";
import { getUser } from "../state/user";
import { useData } from "../state/data";

export default function InteractActions({ id, mediaType }) {
  const user = getUser();
  const type = mediaType === "movies" ? "movie" : "tvshow";
  const { favorite, watchlist } = useData(id, mediaType) || {};
  const { addInFavorites, removeFromFavorites } = useController();
  const { addInWatchlist, removeFromWatchlist } = useController();

  const toggleFavorite = () => {
    if (favorite) removeFromFavorites(id, type);
    else addInFavorites(id, type);
  };

  const toggleWatchlist = () => {
    if (watchlist) removeFromWatchlist(id, type);
    else addInWatchlist(id, type);
  };

  return (
    <div className="actions">
      <button
        title={user ? "" : "Login to add to favorite"}
        className={"btn btn--" + (favorite ? "danger" : "transperent")}
        onClick={toggleFavorite}
        disabled={!user}
      >
        {favorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
        <span>{favorite ? "Favorited" : "Favorite"}</span>
      </button>

      <button
        title={user ? "" : "Login to add to watchlist"}
        className={"btn btn--" + (watchlist ? "primary" : "transperent")}
        onClick={toggleWatchlist}
        disabled={!user}
      >
        {watchlist ? <IoBookmark /> : <IoBookmarkOutline />}
        <span>{watchlist ? "added" : "watchlist"}</span>
      </button>
    </div>
  );
}
