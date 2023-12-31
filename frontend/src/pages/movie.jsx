import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useController } from "../state";
import { getUser } from "../state/user";
import { useData } from "../state/data";
import { AuthRoute } from "./auth";
import DetailsPageLoading from "../layouts/detailsPageLoading";
import InteractActions from "../layouts/interactActions";
import Casts from "../layouts/casts";
import VideoPlayer from "../components/videoContainer";
import Pagination from "../components/Pagination";
import MediaNotfound from "./mediaNotfound";

export default function MoviePage() {
  const { id } = useParams();
  const mediaType = "movies";
  const [isLoading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const user = getUser();
  const movie = useData(id, mediaType);
  const { checkMovieExist } = useController();

  useEffect(() => {
    setLoading(true);

    checkMovieExist(id, true)
      .then(() => setNotFound(false))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (isLoading) return <DetailsPageLoading />;
  if (notFound && !user) return <AuthRoute />;
  if (notFound) return <MediaNotfound mediaType="Movie" />;

  const { poster, banner, video, language } = movie;
  const { title, tagline, overview, genres } = movie;
  const { release_date, runtime, status, casts } = movie;

  const duration = `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
  const opions = { day: "2-digit", month: "2-digit", year: "numeric" };
  const release = new Date(release_date).toLocaleDateString("en-IN", opions);
  const genresString = genres?.filter((_, i) => i < 4)?.join(", ");

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

            <InteractActions id={id} mediaType={mediaType} />
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
