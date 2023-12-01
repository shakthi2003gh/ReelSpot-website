import { useId, useState } from "react";
import { Link } from "react-router-dom";
import FormInputs from "../components/formInputs";
import { useController } from "../state";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { signupUser } = useController();

  const inputs = [
    {
      id: useId(),
      type: "text",
      label: "name",
      value: name,
      setValue: setName,
      placeholder: "username",
      error: nameError,
    },
    {
      id: useId(),
      type: "email",
      label: "email",
      value: email,
      setValue: setEmail,
      placeholder: "email@domain.com",
      error: emailError,
    },
    {
      id: useId(),
      type: "password",
      label: "password",
      value: password,
      setValue: setPassword,
      placeholder: "••••••••••",
      error: passwordError,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    signupUser({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>

      <FormInputs inputs={inputs} />

      <div className="footer">
        <p>
          Already have an account? <Link to="/auth?method=signin">log in</Link>
        </p>

        <button className="btn btn--primary">Submit</button>
      </div>
    </form>
  );
}
