import { useId } from "react";
import { useFetch } from "../state";
import LandingPage from "../layouts/landingPage";

export default function Tvshows() {
  const tvshows = useFetch((state) => state.page?.tvshows);
  const sections = [
    {
      id: useId(),
      title: "discover",
      to: "/movies/discover",
      data: tvshows?.discover,
    },
    {
      id: useId(),
      title: "trending",
      to: "/movies/trending",
      data: tvshows?.trending.slice(3),
    },
    {
      id: useId(),
      title: "popular",
      to: "/movies/popular",
      data: tvshows?.popular,
    },
    {
      id: useId(),
      title: "top rated",
      to: "/movies/top_rated",
      data: tvshows?.top_rated,
    },
  ];

  if (!tvshows) return <div></div>;

  return (
    <LandingPage
      recommends={tvshows.trending.slice(0, 3)}
      sections={sections}
    />
  );
}
