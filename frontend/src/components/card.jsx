import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useFetch } from "../state";

export default function Card({ id }) {
  const navigate = useNavigate();
  const { movies, tvshows } = useFetch((state) => state);

  const data = movies[id] || tvshows[id];
  const { poster, title, tagline, type } = data;

  const to = `/${type === "movie" ? "movies" : "tv"}/${id}`;
  const favorite = useFetch((state) => state?.user.favorites?.includes(id));

  const handleKeydown = (e) => {
    if (e.keyCode === 13) navigate(to);
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

          <button title="Add to favorite" tabIndex={-1}>
            {favorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
          </button>
        </div>
        <p className="tagline">{tagline || "No tagline"}</p>
      </div>
    </div>
  );
}
