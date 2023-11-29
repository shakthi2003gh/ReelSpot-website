import { Routes, Route } from "react-router-dom";
import Header from "./layouts/header";
import SideBar from "./layouts/sideBar";
import Home from "./pages/home";
import Movies from "./pages/movies";
import Televisions from "./pages/televisions";
import PageNotFound from "./pages/404";
import Favorites from "./pages/favorites";
import WatchList from "./pages/watchlist";

function App() {
  return (
    <>
      <Header />

      <main>
        <SideBar />

        <Routes>
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/tv" element={<Televisions />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
