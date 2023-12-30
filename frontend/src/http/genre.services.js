import { getData } from "./common.services";

export function getGenres() {
  return new Promise((resolve, reject) => {
    const genres = {};

    getData("/genres/")
      .then((data) => {
        data.forEach((genre) => {
          genres[genre._id] = genre;
        });

        resolve(genres);
      })
      .catch(reject);
  });
}
