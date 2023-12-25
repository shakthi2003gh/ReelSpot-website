import { getData } from "./common.services";

export function fetchTvshow(id) {
  return getData("/tvshows/" + id);
}

export function fetchTvshowSeasons(id) {
  return getData(`/tvshows/${id}/seasons`);
}

export function fetchTvshowsByCategory(category, page = 1) {
  return getData(`/categories/${category}/tvshows?page=${page}`);
}
