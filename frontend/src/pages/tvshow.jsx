import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useController, useFetch } from "../state/index";
import useMediaQuery from "../hooks/useMediaQuery";
import InteractActions from "../layouts/interactActions";
import Casts from "../layouts/casts";
import Seasons from "../layouts/seasons";
import VideoPlayer from "../components/videoContainer";
import Pagination from "../components/Pagination";

export default function TvshowPage() {
  const { id } = useParams();

  const isLargeDevice = useMediaQuery(1250);

  const { tvshows, genres: Genres } = useFetch((state) => state);
  const { checkTvshowExist, checkTvshowSeasonsExist } = useController();

  useEffect(() => {
    checkTvshowExist(id);
    if (!!tvshow?._id) checkTvshowSeasonsExist(tvshow?._id);
  }, [id]);

  const tvshow = tvshows[id];
  if (!tvshow) return <div>Not found with {id}</div>;

  const { poster, banner, video, language } = tvshow;
  const { title, tagline, overview, genres, seasons } = tvshow;
  const { total_seasons, total_episodes, status, casts } = tvshow;

  const genresString = genres
    ?.filter((_, i) => i < 4)
    .map((id) => Genres[id]?.name)
    .join(", ");

  return (
    <div className="tvshow-page">
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

            <InteractActions id={id} mediaType="tvshow" />
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
