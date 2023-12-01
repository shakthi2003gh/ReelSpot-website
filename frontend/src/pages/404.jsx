import { Link } from "react-router-dom";
import { TbError404 } from "react-icons/tb";

export default function PageNotFound() {
  return (
    <div className="page-not-found">
      <TbError404 />
      <h1>Page Not Found</h1>

      <Link to="/" className="btn btn--primary">
        go to homepage
      </Link>
    </div>
  );
}
