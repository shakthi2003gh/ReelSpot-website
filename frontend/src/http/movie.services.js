import { getData } from "./common.services";

export function fetchMovie(id) {
  return getData("/movies/" + id);
}

export function fetchMoviesByCategory(category, page = 1) {
  return getData(`/categories/${category}/movies?page=${page}`);
}
