import { MdOutlineErrorOutline } from "react-icons/md";

export default function InputGroup(props) {
  const { id, type, label, value, placeholder } = props;
  const { error, setValue } = props;

  const handleType = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={"input-group" + (error ? " error" : "")}>
      <label htmlFor={id}>{label || "input"}</label>
      <input
        id={id}
        type={type || "text"}
        value={value}
        placeholder={placeholder}
        onChange={handleType}
      />

      {error && (
        <div className="error-message">
          <MdOutlineErrorOutline />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
