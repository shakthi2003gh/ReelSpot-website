import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa6";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { useFetch } from "../state";
import useMediaQuery from "./../hooks/useMediaQuery";

export default function Banner({ recommends }) {
  if (!recommends?.length) return;

  const [index, setIndex] = useState(0);
  const isDisplayLarge = useMediaQuery(780);
  const { genres: Genres, movies, tvshows } = useFetch((state) => state);

  const id = recommends[index];
  const data = movies[id] || tvshows[id];

  const { _id, tmdb_id, title, banner, type } = data;
  const { runtime, genres, release_date } = data;
  const { total_episodes, total_seasons } = data;

  const to = `/${type === "movie" ? "movies" : "tvshows"}/${_id || tmdb_id}`;
  const duration = `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
  const year = new Date(release_date).getFullYear();
  const bookMarked = useFetch((state) => state?.user.watchlist?.includes(_id));
  const genresString = genres
    .filter((_, i) => i < 4)
    .map((id) => Genres[id].name)
    .join(", ");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => {
        if (index + 1 >= recommends.length) return 0;

        return ++index;
      });
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [recommends]);

  const handleEnter = (i) => (e) => {
    if (index === i) return;
    if (e.keyCode === 13) setIndex(i);
  };

  const handlePreview = (i) => () => {
    if (index === i) return;
    setIndex(i);
  };

  if (!banner)
    return (
      <div className="banner">
        <div className="poster"></div>
      </div>
    );

  return (
    <div className="banner">
      <div className="poster">
        <img src={banner} alt="" />
      </div>

      <div className="content">
        <div className="title">{title}</div>

        {type === "movie" ? (
          <p>
            {year} • {genresString} • {duration}
          </p>
        ) : (
          <p>
            {total_seasons} seasons • {total_episodes} episodes • {genresString}
          </p>
        )}

        <div className="actions">
          <Link to={to} className="btn btn--primary">
            <FaPlay />
            <span>watch</span>
          </Link>

          <button className="btn btn--transperent">
            {bookMarked ? <IoBookmark /> : <IoBookmarkOutline />}
            <span>{bookMarked ? "added" : "watchlist"}</span>
          </button>
        </div>
      </div>

      {isDisplayLarge && (
        <div className="previews">
          {recommends.map((id, i) => (
            <img
              key={id}
              src={(movies[id] || tvshows[id]).banner}
              alt=""
              className={index === i ? "previewing" : ""}
              onClick={handlePreview(i)}
              onKeyDown={handleEnter(i)}
              tabIndex={0}
            />
          ))}
        </div>
      )}
    </div>
  );
}
