const { Genre } = require("../models/genre");

exports.getGenreIds = async function (tmdb_genres) {
  return await Promise.all(
    tmdb_genres.map(async ({ id, name }) => {
      const genre = await Genre.findOne({ tmdb_id: id });
      if (genre) return genre._id;

      const newGenre = new Genre({ id, name });
      await newGenre.save();
      return newGenre._id;
    })
  );
};
