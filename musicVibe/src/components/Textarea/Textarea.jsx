import styles from "./Textarea.module.scss";

function Textarea({
  name,
  value,
  onChange,
  placeholder,
  required = false,
  className,
  rows = 4,
  maxLength,
}) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`${styles.textarea} ${className || ""}`}
      rows={rows}
      maxLength={maxLength}
    />
  );
}

export default Textarea;
