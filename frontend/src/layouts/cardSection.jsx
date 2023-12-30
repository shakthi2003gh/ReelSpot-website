import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import RenderCards from "../components/renderCards";

export default function CardSection({ title, to, data, notFoundMessage }) {
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

      <RenderCards data={data} notFoundMessage={notFoundMessage} />
    </section>
  );
}
