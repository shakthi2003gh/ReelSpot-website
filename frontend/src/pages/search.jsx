import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useController, useFetch } from "../state";
import { authRoute } from "./auth";
import Pagination from "./../components/pagination";
import SearchBar from "./../components/search";
import RenderCards from "./../components/renderCards";

function searchPage() {
  const page = 1;
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const query = useSearchParams()?.[0]?.get("q") || "";
  const isNotMobileDevice = useFetch((state) => state.mediaQuery.isTablet);
  const { searchData } = useController();

  const filterUniqueData = (data) =>
    data.filter((value, index, self) => {
      const i = self.findIndex((v) => {
        return v.id === value.id && v.mediaType === value.mediaType;
      });

      return i === index;
    });

  useEffect(() => {
    if (query.trim() === "") return;
    setLoading(true);

    searchData(query, page)
      .then((data) => {
        setData(filterUniqueData(data));
      })
      .finally(() => setLoading(false));
  }, [query, page]);

  return (
    <div className="search-page">
      <Pagination />

      {isNotMobileDevice && <h1>Search</h1>}

      {!isNotMobileDevice && <SearchBar />}

      {!!data?.length ? (
        <RenderCards data={data} />
      ) : (
        query.trim() !== "" && (
          <div>{isLoading ? "Loading..." : "No Movie/Tvshow found"}</div>
        )
      )}
    </div>
  );
}

const Search = authRoute(searchPage);
export default Search;
