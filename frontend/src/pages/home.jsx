import { useId } from "react";
import { getPage } from "../state/page";
import LandingPage from "../layouts/landingPage";

export default function Home() {
  const { home } = getPage();
  const sections = [
    {
      id: useId(),
      title: "discover",
      data: home?.discover,
    },
    {
      id: useId(),
      title: "trending",
      data: home?.trending.slice(3, 13),
    },
    {
      id: useId(),
      title: "movies",
      to: "/movies",
      data: home?.movies,
    },
    {
      id: useId(),
      title: "tvshows",
      to: "/tvshows",
      data: home?.tvShows,
    },
  ];

  return (
    <LandingPage recommends={home?.trending?.slice(0, 3)} sections={sections} />
  );
}
