import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import Card from "./../components/card";

export default function CardSection({ title, to, data }) {
  return (
    <section className="card-section">
      <div className="header">
        {to ? (
          <>
            <Link to={to} tabIndex={-1}>
              <h2>{title || "section"}</h2>
            </Link>

            <Link to={to} className="view-all">
              view all <IoIosArrowForward />
            </Link>
          </>
        ) : (
          <h2>{title || "section"}</h2>
        )}
      </div>
      <div className="cards">
        {data.map(({ id, mediaType }) => (
          <Card key={id} id={id} mediaType={mediaType} />
        ))}
      </div>
    </section>
  );
}
