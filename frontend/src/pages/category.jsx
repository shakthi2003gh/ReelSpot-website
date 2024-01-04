import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useController } from "../state";
import { getCategoryPage } from "../state/page";
import { authRoute } from "./auth";
import Pagination from "../components/pagination";
import RenderCards from "../components/renderCards";
import PageNotFound from "./404";

const categories = ["discover", "trending", "popular", "top_rated", "upcoming"];
function isInvalidCategory(category) {
  return (
    !categories.includes(category) ||
    (category === "upcoming" && mediaType === "tvshows")
  );
}

function category() {
  const loaction = useLocation();
  const { category } = useParams();
  const { checkCategory } = useController();

  const mediaType = loaction.pathname.match("movies") ? "movies" : "tvshows";
  const data = getCategoryPage(category, mediaType);

  const [isFetching, setIsFetching] = useState(false);
  const dataCount = data ? Math.ceil(data.length / 20) : 0;
  const [page, setPage] = useState(dataCount || 1);
  const isNotValidCategory = isInvalidCategory(category);

  useEffect(() => {
    if (dataCount === page) return;
    if (isNotValidCategory) return;
    setIsFetching(true);

    checkCategory(mediaType, category, page).finally(() =>
      setIsFetching(false)
    );
  }, [dataCount, page, isNotValidCategory, mediaType, category]);

  if (isNotValidCategory) return <PageNotFound />;

  const handleInfinityScroll = (e) => {
    if (category === "trending") return;

    const page = e.target;
    const displayHeight = page.clientHeight;
    const pageHeight = page.scrollHeight;

    if (isFetching) return;
    if (pageHeight - (displayHeight * 2 - 200) > page.scrollTop) return;

    setIsFetching(false);
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

const Category = authRoute(category);
export default Category;
