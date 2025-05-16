// Components
import { SearchIcon } from "@/components/index.js";
// Styles
import styles from "./Input.module.scss";

function Input({
  type = "text",
  placeholder = "",
  isComment = false,
  isSearch = false,
  value = "",
  onChange,
  error = "",
  required = false,
  disabled = false,
  name = "",
}) {
  return (
    <div className={styles.input__wrapper}>
      {isSearch && <SearchIcon className={styles["input__search-icon"]} />}

      <input
        className={`${styles.input} ${isComment ? styles.input__comment : ""} ${isSearch ? styles.input__search : ""} ${
          error ? styles.input__error : ""
        }`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        name={name}
      />
      {error && <span className={styles.input__error_message}>{error}</span>}
    </div>
  );
}

export default Input;
