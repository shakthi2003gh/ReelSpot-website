import { Routes, Route } from "react-router-dom";
import { useController, useFetch } from "./state";
import { getAppLoading } from "./state/user";
import Header from "./layouts/header";
import SideBar from "./layouts/sideBar";
import Navigation from "./layouts/navigation";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Movies from "./pages/movies";
import Tvshows from "./pages/tvshows";
import Favorites from "./pages/favorites";
import WatchList from "./pages/watchlist";
import MoviePage from "./pages/movie";
import TvshowPage from "./pages/tvshow";
import Category from "./pages/category";
import Loading from "./pages/loading";
import PageNotFound from "./pages/404";

function App() {
  const isLoading = getAppLoading();
  const isMobileDevice = useFetch((state) => state.mediaQuery.isMobile);
  const { toggleMenuOpen } = useController();

  return (
    <>
      <Header />

      {isLoading ? (
        <Loading />
      ) : (
        <main className="container">
          {!isMobileDevice && <SideBar />}

          <Routes>
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/tvshows/category/:category" element={<Category />} />
            <Route path="/tvshows/:id" element={<TvshowPage />} />
            <Route path="/tvshows" element={<Tvshows />} />
            <Route path="/movies/category/:category" element={<Category />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          <div className="backdrop" onClick={toggleMenuOpen}></div>

          {isMobileDevice && <Navigation />}
        </main>
      )}
    </>
  );
}

export default App;
