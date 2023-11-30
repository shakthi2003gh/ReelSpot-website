import { Routes, Route } from "react-router-dom";
import useMediaQuery from "./hooks/useMediaQuery";
import Header from "./layouts/header";
import SideBar from "./layouts/sideBar";
import Navigation from "./layouts/navigation";
import Home from "./pages/home";
import Movies from "./pages/movies";
import Televisions from "./pages/televisions";
import PageNotFound from "./pages/404";
import Favorites from "./pages/favorites";
import WatchList from "./pages/watchlist";

function App() {
  const isNotMobileDevice = useMediaQuery(450);

  return (
    <>
      <Header />

      <main className="container">
        {isNotMobileDevice && <SideBar />}

        <Routes>
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/tv" element={<Televisions />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        {!isNotMobileDevice && <Navigation />}
      </main>
    </>
  );
}

export default App;
