import { useState } from "react";
import Banner from "./banner";
import CardSection from "./cardSection";

export default function LandingPage({ recommends, sections }) {
  const [isLoading, setLoading] = useState(true);

  if (recommends && sections && isLoading) setLoading(false);
  if (isLoading)
    return (
      <div>
        <div className="banner-loading"></div>

        {[...Array(3)].map((_, i) => (
          <div key={i} className="card-section-loading">
            <div className="title "></div>
            <div className="cards">
              {[...Array(7)].map((_, j) => (
                <div key={`${j}-${i}`} className="card-loading">
                  <div className="poster"></div>
                  <div className="title"></div>
                  <div className="overview"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="page">
      <Banner recommends={recommends} />

      {sections.map(({ id, ...props }) => (
        <CardSection key={id} {...props} />
      ))}
    </div>
  );
}
