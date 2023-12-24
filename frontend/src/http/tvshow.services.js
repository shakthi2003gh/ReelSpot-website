import { getData } from "./common.services";

export function fetchTvshow(id) {
  return getData("/tvshows/" + id);
}

export function fetchTvshowSeasons(id) {
  return getData(`/tvshows/${id}/seasons`);
}
