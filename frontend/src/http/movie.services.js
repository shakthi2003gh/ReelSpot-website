import { getData, postData, deleteData } from "./common.services";

export function fetchMovie(id) {
  return getData("/movies/" + id);
}

export function favoriteMovie(id) {
  return postData(`/movies/${id}/favorite`);
}

export function unfavoriteMovie(id) {
  return deleteData(`/movies/${id}/unfavorite`);
}

export function watchlistMovie(id) {
  return postData(`/movies/${id}/watchlist`);
}

export function unwatchlistMovie(id) {
  return deleteData(`/movies/${id}/unwatchlist`);
}

export function fetchMoviesByCategory(category, page = 1) {
  return getData(`/categories/${category}/movies?page=${page}`);
}
