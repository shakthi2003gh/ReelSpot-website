import { useId, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Joi from "joi";
import { useController } from "../state";
import FormInputs from "../components/formInputs";

const schema = {
  name: Joi.string().required().min(3).max(30),
  email: Joi.string().email({ tlds: false }).required().min(3).max(30),
  password: Joi.string().required().min(3).max(50),
};

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { signupUser } = useController();

  const [isLoading, setLoading] = useState(false);

  const invalidInputs = useMemo(() => {
    const { error } = Joi.object(schema).validate({ name, email, password });

    return !!error;
  }, [name, email, password]);

  const handleSetValue = (name, setValue, setError) => (value) => {
    const { error } = schema[name].label(name).validate(value);
    setError(error?.details[0].message);

    setValue(value);
  };

  const inputs = [
    {
      id: useId(),
      type: "text",
      label: "name",
      value: name,
      setValue: handleSetValue("name", setName, setNameError),
      placeholder: "username",
      error: nameError,
    },
    {
      id: useId(),
      type: "email",
      label: "email",
      value: email,
      setValue: handleSetValue("email", setEmail, setEmailError),
      placeholder: "email@domain.com",
      error: emailError,
    },
    {
      id: useId(),
      type: "password",
      label: "password",
      value: password,
      setValue: handleSetValue("password", setPassword, setPasswordError),
      placeholder: "••••••••••",
      error: passwordError,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    signupUser({ name, email, password }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>

      <FormInputs inputs={inputs} />

      <div className="footer">
        <button
          className="btn btn--primary"
          disabled={invalidInputs || isLoading}
        >
          Submit
        </button>

        <p>
          Already have an account? <Link to="/auth?method=signin">log in</Link>
        </p>
      </div>
    </form>
  );
}
