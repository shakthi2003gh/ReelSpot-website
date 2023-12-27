import { useFetch } from "../state";
import RenderCards from "./../components/renderCards";
import Pagination from "./../components/pagination";

export default function Favorites() {
  const { favorites } = useFetch((state) => state?.user || {});

  return (
    <div className="favorite-page">
      <Pagination />

      <h1>Favorites</h1>

      {!!favorites?.length ? (
        <RenderCards data={favorites} />
      ) : (
        <div>No Movie / Tvshow in favorites</div>
      )}
    </div>
  );
}
