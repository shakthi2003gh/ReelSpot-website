import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useFetch } from "../state";

export default function Card({ id, mediaType }) {
  const navigate = useNavigate();
  const type = mediaType === "movie" ? "movies" : "tvshows";

  const data = useFetch((state) => state?.[type]?.[id]);
  const favorite = useFetch((state) => state.user?.favorites?.includes(id));

  const handleKeydown = (e) => {
    if (e.keyCode === 13) navigate(to);
  };

  if (!data) return <div>loading...</div>;

  const to = `/${type}/${id}`;
  const { poster, title, tagline } = data;

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

          <button title="Add to favorite" tabIndex={-1}>
            {favorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
          </button>
        </div>
        <p className="tagline">{tagline || "No tagline"}</p>
      </div>
    </div>
  );
}
