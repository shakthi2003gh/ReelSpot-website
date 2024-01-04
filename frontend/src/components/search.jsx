import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch, MdClear } from "react-icons/md";
import { searchSuggestions } from "./../http/resource.services";
import Suggestion from "./suggestion";

export default function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleType = (e) => setQuery(e.target.value);
  const handleClear = (e) => {
    if (!(e.type === "click" || e.key === "Enter")) return;

    if (query.trim() !== "") setQuery("");
  };

  const openSuggestions = () => setOpen(true);
  const closeSuggestions = () => setOpen(false);

  const toggleSuggestions = (e) => {
    if (e.key == "Escape") {
      if (open) closeSuggestions();
      else openSuggestions();
    }
  };

  const handleNavigate = (e) => {
    if (e.key !== "Enter") return;
    if (query.trim() === "") return navigate("/");

    navigate(`/search?q=${query}`);
    closeSuggestions();
  };

  useEffect(() => {
    if (query.trim() === "") return setSuggestions([]);

    !open && openSuggestions();

    const debounce = setTimeout(() => {
      searchSuggestions(query).then(setSuggestions);
    }, 600);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="search" onKeyUpCapture={toggleSuggestions}>
      <div className="search__input-group">
        <MdSearch />

        <input
          type="text"
          value={query}
          placeholder="Search"
          onFocus={openSuggestions}
          onChange={handleType}
          onKeyUp={handleNavigate}
        />

        {!!query.length && (
          <MdClear
            tabIndex={0}
            className="clear"
            onClick={handleClear}
            onKeyUp={handleClear}
          />
        )}
      </div>

      {open && (
        <div className="suggestions">
          {suggestions.map((data) => (
            <Suggestion
              key={data.tmdb_id}
              data={data}
              handleClose={closeSuggestions}
            />
          ))}
        </div>
      )}
    </div>
  );
}
