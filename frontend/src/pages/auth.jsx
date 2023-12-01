import { Link, useSearchParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { GoSun, GoMoon } from "react-icons/go";
import { useController, useFetch } from "../state";
import LoginForm from "../layouts/loginForm";
import SignupForm from "../layouts/signupForm";

export default function Auth() {
  const [searchParams] = useSearchParams();
  const { theme, oppositeTheme } = useFetch((state) => state.ui);
  const { toggleTheme } = useController();

  const method = searchParams.get("method");

  return (
    <main className="auth container">
      <div className="header">
        <Link to="/" className="btn">
          <IoArrowBack /> Home
        </Link>

        <button className="btn" onClick={toggleTheme}>
          {theme === "dark" ? <GoSun /> : <GoMoon />}
          {oppositeTheme}
        </button>
      </div>

      {method === "signin" ? <LoginForm /> : <SignupForm />}
    </main>
  );
}
