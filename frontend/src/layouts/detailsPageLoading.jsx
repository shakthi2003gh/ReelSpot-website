import Pagination from "../components/pagination";

export default function DetailsPageLoading() {
  return (
    <div className="details-page-loading">
      <div className="main">
        <Pagination />

        <div className="video-player"></div>

        <div className="details">
          <div className="poster"></div>
          <div>
            <div className="title"></div>
            <div className="tagline"></div>
          </div>
        </div>
      </div>

      <div className="sticky-section">
        <div className="title"></div>

        <div className="casts">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="cast">
              <div className="img"></div>

              <div className="detail">
                <div className="name"></div>
                <div className="character"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
