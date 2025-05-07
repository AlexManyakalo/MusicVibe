import styles from "./Input.module.scss";

function Input({
  type = "text",
  placeholder = "",
  isBottom = false,
  value = "",
  onChange,
  name,
  error = "",
  required = false,
  disabled = false,
}) {
  return (
    <div className={styles.input__wrapper}>
      <input
        className={`${styles.input} ${isBottom ? styles.input__bottom : ""} ${
          error ? styles.input__error : ""
        }`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        disabled={disabled}
      />
      {error && <span className={styles.input__error_message}>{error}</span>}
    </div>
  );
}

export default Input;
