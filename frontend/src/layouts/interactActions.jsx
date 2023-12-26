import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { useController, useFetch } from "../state";

export default function InteractActions({ id, mediaType }) {
  const { favorites, watchlist: watchlists } = useFetch((state) => state?.user);
  const { addInFavorites, removeFromFavorites } = useController();
  const { addInWatchlist, removeFromWatchlist } = useController();

  const favorite = favorites?.some((data) => {
    return data.id === id && data.mediaType === mediaType;
  });
  const watchlist = watchlists?.some((data) => {
    return data.id === id && data.mediaType === mediaType;
  });

  const toggleFavorite = () => {
    if (favorite) removeFromFavorites(id, mediaType);
    else addInFavorites(id, mediaType);
  };

  const toggleWatchlist = () => {
    if (watchlist) removeFromWatchlist(id, mediaType);
    else addInWatchlist(id, mediaType);
  };

  return (
    <div className="actions">
      <button
        className={"btn btn--" + (favorite ? "danger" : "transperent")}
        onClick={toggleFavorite}
      >
        {favorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
        <span>{favorite ? "Favorited" : "Favorite"}</span>
      </button>

      <button
        className={"btn btn--" + (watchlist ? "primary" : "transperent")}
        onClick={toggleWatchlist}
      >
        {watchlist ? <IoBookmark /> : <IoBookmarkOutline />}
        <span>{watchlist ? "added" : "watchlist"}</span>
      </button>
    </div>
  );
}
