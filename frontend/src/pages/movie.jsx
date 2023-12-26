import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useController, useFetch } from "../state/index";
import InteractActions from "../layouts/interactActions";
import Casts from "../layouts/casts";
import VideoPlayer from "../components/videoContainer";
import Pagination from "../components/Pagination";

export default function MoviePage() {
  const { id } = useParams();
  const { movies, genres: Genres } = useFetch((state) => state);
  const { checkMovieExist } = useController();

  const movie = movies[id];

  useEffect(() => {
    checkMovieExist(id);
  }, [id]);

  if (!movie) return <div>Not found with {id}</div>;

  const { poster, banner, video, language } = movie;
  const { title, tagline, overview, genres } = movie;
  const { release_date, runtime, status, casts } = movie;

  const duration = `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
  const opions = { day: "2-digit", month: "2-digit", year: "numeric" };
  const release = new Date(release_date).toLocaleDateString("en-IN", opions);
  const genresString = genres
    ?.filter((_, i) => i < 4)
    .map((id) => Genres[id]?.name)
    .join(", ");

  return (
    <div className="movie-page">
      <div className="main">
        <Pagination />

        <VideoPlayer videoKey={video} cover={banner} />

        <div className="details">
          <div className="poster">
            <img src={poster} alt="" />
          </div>

          <div className="detail">
            <h1 className="title" title={title}>
              {title}
            </h1>

            <p>{tagline || "No tagline"}</p>

            <InteractActions id={id} mediaType="movie" />
          </div>
        </div>

        <div className="sections">
          <section>
            <h2>Overview</h2>
            <p>{overview || "No overview"}</p>
          </section>

          <section className="info">
            <h2>Info</h2>

            <span className="duration">
              <b>Language:</b> {language}
            </span>

            <span className="duration">
              <b>Duration:</b> {duration}
            </span>

            <span className="release">
              <b>Release:</b> {release}
            </span>

            <span className="genres">
              <b>Genres:</b> {genresString}
            </span>

            <span className="status">
              <b>status:</b> {status}
            </span>
          </section>
        </div>
      </div>

      <div className="sticky-section">
        <Casts data={casts} />
      </div>
    </div>
  );
}
