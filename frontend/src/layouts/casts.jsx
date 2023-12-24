import placeholderImage from "../assets/actor.png";

export default function Casts({ data }) {
  return (
    <section className="cast-section">
      <h2>Casts</h2>

      {!!data?.length ? (
        <div className="casts">
          {data.map(({ _id, actor, character }) => {
            const { image, name } = actor;

            return (
              <div key={_id} className="cast">
                <div className="image">
                  <img src={image || placeholderImage} alt="" loading="lazy" />
                </div>

                <div className="info">
                  <span className="name" title={name}>
                    {name}
                  </span>
                  <span className="played-as" title={character}>
                    as {character}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <span>Casts not found</span>
      )}
    </section>
  );
}
