import { useNavigate, Link } from "react-router-dom";

export default function Suggestion({ data, handleClose }) {
  const navigate = useNavigate();

  const { tmdb_id, title, poster, type } = data;
  const to = `/${type}s/${tmdb_id}`;

  const handleNavigate = (e) => {
    if (e.key !== "Enter") return;

    navigate(to);
    handleClose();
  };

  return (
    <div
      key={tmdb_id}
      className="suggestion"
      tabIndex={0}
      onKeyUp={handleNavigate}
    >
      <Link className="poster" to={to} tabIndex={-1} onClick={handleClose}>
        {poster && <img src={poster} alt="" />}
      </Link>

      <div className="details">
        <Link className="title" to={to} tabIndex={-1} onClick={handleClose}>
          {title}
        </Link>
        <div className="type">in {type}s</div>
      </div>
    </div>
  );
}
