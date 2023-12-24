import { useState } from "react";
import DropDown from "../components/dropdown";
import noimage from "../assets/no-image.png";

export default function Seasons({ data }) {
  const [currentSeason, setCurrentSeason] = useState(0);

  if (!data.length)
    return (
      <div className="seasons">
        <DropDown />
        <br />
        <br />
        <span style={{ textAlign: "center" }}>loading...</span>
      </div>
    );

  const { overview, episodes } = data[currentSeason];

  const handleSelect = (e) => setCurrentSeason(e.target.value);

  return (
    <section className="seasons">
      <div className="info">
        <DropDown options={data} onChange={handleSelect} />

        <h2>Season {Number(currentSeason) + 1}</h2>
        <p>{overview}</p>
      </div>

      <div className="episodes-section">
        <h3>Episodes</h3>

        <div className="episodes">
          {episodes.map(({ tmdb_id, title, image, runtime }) => {
            const hour = Math.floor(runtime / 60);
            const minute = Math.floor(runtime % 60);
            const duration = `${hour ? hour + "h" : ""} ${
              minute ? minute + "m" : ""
            }`;

            return (
              <div key={tmdb_id} className="episode">
                <div className="poster">
                  <img src={image || noimage} alt="" />
                </div>

                <div className="detail">
                  <div className="title">{title}</div>
                  <div className="duration">{duration}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
