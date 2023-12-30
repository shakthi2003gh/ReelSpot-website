import { MdLocalMovies } from "react-icons/md";
import { PiTelevision } from "react-icons/pi";
import Pagination from "../components/Pagination";

export default function MediaNotfound({ mediaType }) {
  return (
    <div className="media-not-found alert-page">
      <Pagination />

      <div className="body">
        <div className="icon">
          {mediaType === "Movie" ? <MdLocalMovies /> : <PiTelevision />}
        </div>

        <div className="message">{mediaType} not found</div>
      </div>
    </div>
  );
}
