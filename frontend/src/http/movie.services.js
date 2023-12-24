import { getData } from "./common.services";

export function fetchMovie(id) {
  return getData("/movies/" + id);
}
