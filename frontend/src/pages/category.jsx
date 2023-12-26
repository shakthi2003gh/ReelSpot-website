import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useController, useFetch } from "../state";
import Pagination from "../components/Pagination";
import RenderCards from "../components/renderCards";
import PageNotFound from "./404";

const categories = ["discover", "trending", "popular", "top_rated", "upcoming"];

export default function Category() {
  const loaction = useLocation();
  const { category } = useParams();
  const { checkCategory } = useController();

  const mediaType = loaction.pathname.match("movies") ? "movies" : "tvshows";
  const data = useFetch((state) => state.categories?.[mediaType]?.[category]);

  const [isFetching, setCanFetch] = useState(false);
  const dataCount = data ? Math.ceil(data.length / 20) : 0;
  const [page, setPage] = useState(dataCount || 1);
  const isNotValidCategory =
    !categories.includes(category) ||
    (category === "upcoming" && mediaType === "tvshows");

  useEffect(() => {
    if (dataCount === page) return;

    setCanFetch(true);
    if (isNotValidCategory) return;

    checkCategory(mediaType, category, page).then(() => setCanFetch(false));
  }, [page]);

  if (isNotValidCategory) return <PageNotFound />;

  const handleInfinityScroll = (e) => {
    const page = e.target;
    const displayHeight = page.clientHeight;
    const pageHeight = page.scrollHeight;

    if (isFetching) return;
    if (pageHeight - (displayHeight * 2 - 200) > page.scrollTop) return;

    setCanFetch(false);
    setPage((prev) => ++prev);
  };

  return (
    <div className="category-page" onScroll={handleInfinityScroll}>
      <Pagination />

      <h1>{category.replace("_", " ")}</h1>

      <RenderCards data={data} />

      {isFetching && <div className="loading">Loading...</div>}
    </div>
  );
}
