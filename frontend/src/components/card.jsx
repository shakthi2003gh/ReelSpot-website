import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

export default function Card(props) {
  const navigate = useNavigate();
  const { poster, title, tagline, to = "/", favorite = false } = props;

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
            {title}
          </Link>

          <button title="Add to favorite" tabIndex={-1}>
            {favorite ? <IoMdHeart /> : <IoMdHeartEmpty />}
          </button>
        </div>
        <p className="tagline">{tagline}</p>
      </div>
    </div>
  );
}
