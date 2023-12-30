import { Link, useSearchParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { GoSun, GoMoon } from "react-icons/go";
import { TbShieldLockFilled } from "react-icons/tb";
import { useController, useFetch } from "../state";
import { getUser } from "../state/user";
import LoginForm from "../layouts/loginForm";
import SignupForm from "../layouts/signupForm";

export function AuthRoute() {
  return (
    <div className="authentication-required alert-page">
      <div className="body">
        <div className="icon">
          <TbShieldLockFilled />
        </div>

        <div className="message">Login or Sign Up to continue.</div>

        <div className="buttons">
          <Link to="/auth?method=signin" className="btn btn--primary">
            Login
          </Link>

          <Link to="/auth?method=signup" className="btn btn--primary">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export function authRoute(Component) {
  return (props) => {
    const user = getUser();

    if (user) return <Component {...props} />;
    return <AuthRoute />;
  };
}

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
