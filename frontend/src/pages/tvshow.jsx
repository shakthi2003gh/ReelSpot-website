import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useController, useFetch } from "../state/index";
import useMediaQuery from "../hooks/useMediaQuery";
import Casts from "../layouts/casts";
import Seasons from "../layouts/seasons";
import VideoPlayer from "../components/videoContainer";

export default function TvshowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLargeDevice = useMediaQuery(1250);

  const { tvshows, genres: Genres } = useFetch((state) => state);
  const { checkTvshowExist } = useController();

  useEffect(() => {
    checkTvshowExist(id);
  }, [id]);

  const tvshow = tvshows[id];
  if (!tvshow) return <div>Not found with {id}</div>;

  const { poster, banner, video, language } = tvshow;
  const { title, tagline, overview, genres, seasons } = tvshow;
  const { total_seasons, total_episodes, status, casts } = tvshow;

  const genresString = genres
    .filter((_, i) => i < 4)
    .map((id) => Genres[id]?.name)
    .join(", ");

  const handleGoback = () => navigate(-1);

  return (
    <div className="tvshow-page">
      <div className="main">
        <div className="header">
          <button className="btn btn--transperent" onClick={handleGoback}>
            <IoArrowBack />
            <span>back</span>
          </button>
        </div>

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
          </div>
        </div>

        <div className="sections">
          <section>
            <h2>Overview</h2>
            <p>{overview || "No overview"}</p>
          </section>

          <section className="info">
            <h2>Info</h2>

            <span className="total-seasons">
              <b>Language:</b> {language}
            </span>

            <span className="total-seasons">
              <b>Total seasons:</b> {total_seasons}
            </span>

            <span className="total-episodes">
              <b>Total episodes:</b> {total_episodes}
            </span>

            <span className="genres">
              <b>Genres:</b> {genresString}
            </span>

            <span className="status">
              <b>status:</b> {status}
            </span>
          </section>

          {!isLargeDevice && <Seasons data={seasons} />}

          <Casts data={casts} />
        </div>
      </div>

      {isLargeDevice && (
        <div className="sticky-section">
          <Seasons data={seasons} />
        </div>
      )}
    </div>
  );
}
