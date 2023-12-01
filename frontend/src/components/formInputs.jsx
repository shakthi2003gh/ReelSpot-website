import InputGroup from "../components/inputGroup";

export default function FormInputs({ inputs }) {
  return (
    <div className="form-inputs">
      {inputs.map(({ id, ...props }) => (
        <InputGroup key={id} id={id} {...props} />
      ))}
    </div>
  );
}
