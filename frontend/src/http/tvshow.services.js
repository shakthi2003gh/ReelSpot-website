import { getData, postData, deleteData } from "./common.services";

export function fetchTvshow(id) {
  return getData("/tvshows/" + id);
}

export function favoriteTvshow(id) {
  return postData(`/tvshows/${id}/favorite`);
}

export function unFavoriteTvshow(id) {
  return deleteData(`/tvshows/${id}/unfavorite`);
}

export function watchlistTvshow(id) {
  return postData(`/tvshows/${id}/watchlist`);
}

export function unWatchlistTvshow(id) {
  return deleteData(`/tvshows/${id}/unwatchlist`);
}

export function fetchTvshowSeasons(id) {
  return getData(`/tvshows/${id}/seasons`);
}

export function fetchTvshowsByCategory(category, page = 1) {
  return getData(`/categories/${category}/tvshows?page=${page}`);
}
