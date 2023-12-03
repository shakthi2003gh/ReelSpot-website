import { Routes, Route } from "react-router-dom";
import { useFetch } from "./state";
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
  const isMobileDevice = useFetch((state) => state.mediaQuery.isMobile);

  return (
    <>
      <Header />

      <main className="container">
        {!isMobileDevice && <SideBar />}

        <Routes>
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/tv" element={<Televisions />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        <div className="backdrop"></div>

        {isMobileDevice && <Navigation />}
      </main>
    </>
  );
}

export default App;
