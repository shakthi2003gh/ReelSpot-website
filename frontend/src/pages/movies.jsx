import { useId } from "react";
import { useFetch } from "../state";
import LandingPage from "../layouts/landingPage";

export default function Movies() {
  const movies = useFetch((state) => state.page?.movies);
  const sections = [
    {
      id: useId(),
      title: "discover",
      to: "/movies/discover",
      data: movies?.discover,
    },
    {
      id: useId(),
      title: "trending",
      to: "/movies/trending",
      data: movies?.trending.slice(3),
    },
    {
      id: useId(),
      title: "popular",
      to: "/movies/popular",
      data: movies?.popular,
    },
    {
      id: useId(),
      title: "top rated",
      to: "/movies/top_rated",
      data: movies?.top_rated,
    },
    {
      id: useId(),
      title: "upcoming",
      to: "/movies/upcoming",
      data: movies?.upcoming,
    },
  ];

  if (!movies) return <div></div>;

  return (
    <LandingPage recommends={movies.trending.slice(0, 3)} sections={sections} />
  );
}
