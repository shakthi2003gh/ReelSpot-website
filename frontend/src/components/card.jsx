import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useController } from "../state";
import { getUser } from "../state/user";
import { useData } from "../state/data";

export default function Card({ id, mediaType }) {
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const type = mediaType === "movie" ? "movies" : "tvshows";

  const user = getUser();
  const data = useData(id, type);
  const { addInFavorites, removeFromFavorites } = useController();
  const { checkMovieExist, checkTvshowExist } = useController();

  const handleKeydown = (e) => {
    if (e.keyCode === 13) navigate(to);
  };

  useEffect(() => {
    if (mediaType === "movie") checkMovieExist(id);
    else checkTvshowExist(id);
  }, [id, mediaType]);

  if (data && isLoading) setLoading(false);
  if (isLoading)
    return (
      <div className="card-loading">
        <div className="poster"></div>
        <div className="title"></div>
        <div className="overview"></div>
      </div>
    );

  const to = `/${type}/${id}`;
  const { poster, title, tagline, favorite } = data;

  const toggleFavorite = () => {
    if (favorite) removeFromFavorites(id, mediaType);
    else addInFavorites(id, mediaType);
  };

  return (
    <div className="card" title={title} tabIndex={0} onKeyDown={handleKeydown}>
      <Link to={to} className="poster" tabIndex={-1}>
        <img src={poster} alt="" />
      </Link>

      <div className="details">
        <div>
          <Link to={to} className="title" tabIndex={-1}>
            {title || "No title"}
          </Link>

          <button
            title={user ? "Add to favorite" : "Login to add to favorite"}
            tabIndex={-1}
            onClick={toggleFavorite}
            disabled={!user}
          >
            {favorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
          </button>
        </div>
        <p className="tagline">{tagline || "No tagline"}</p>
      </div>
    </div>
  );
}
