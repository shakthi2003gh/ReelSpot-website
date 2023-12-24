const { getImgUrl } = require("./common");

async function transformCast(data) {
  const { id, name, character, profile_path } = data;

  return {
    character,
    actor: {
      tmdb_id: id,
      image: getImgUrl(profile_path),
      name: name,
    },
  };
}

module.exports = {
  transformCast,
};
