import { useState } from "react";
import Card from "./card";

export default function RenderCards({ data, notFoundMessage }) {
  const [isLoading, setLoading] = useState(true);

  if (data && isLoading) setLoading(false);
  if (isLoading)
    return (
      <div className="cards">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="card-loading">
            <div className="poster"></div>
            <div className="title"></div>
            <div className="overview"></div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="cards">
      {data.length ? (
        data.map(({ id, mediaType }) => (
          <Card key={id} id={id} mediaType={mediaType} />
        ))
      ) : (
        <div className="not-found">{notFoundMessage || "No cards found"}</div>
      )}
    </div>
  );
}
