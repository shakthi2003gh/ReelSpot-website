import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useController } from "../state";
import { getUser } from "../state/user";
import { useData } from "../state/data";
import { AuthRoute } from "./auth";
import useMediaQuery from "../hooks/useMediaQuery";
import DetailsPageLoading from "../layouts/detailsPageLoading";
import InteractActions from "../layouts/interactActions";
import Casts from "../layouts/casts";
import Seasons from "../layouts/seasons";
import VideoPlayer from "../components/videoContainer";
import Pagination from "../components/pagination";
import MediaNotfound from "./mediaNotfound";

export default function TvshowPage() {
  const { id } = useParams();
  const mediaType = "tvshows";
  const [isLoading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const isLargeDevice = useMediaQuery(1250);

  const user = getUser();
  const tvshow = useData(id, mediaType);
  const { checkTvshowExist, checkTvshowSeasonsExist } = useController();

  useEffect(() => {
    setLoading(true);

    checkTvshowExist(id, true)
      .then((id) => {
        if (id) checkTvshowSeasonsExist(id);
        setNotFound(false);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (isLoading) return <DetailsPageLoading />;
  if (notFound && !user) return <AuthRoute />;
  if (notFound) return <MediaNotfound mediaType="Tvshow" />;

  const { poster, banner, video, language } = tvshow;
  const { title, tagline, overview, genres, seasons } = tvshow;
  const { total_seasons, total_episodes, status, casts } = tvshow;

  const genresString = genres?.filter((_, i) => i < 4).join(", ");

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
