import styles from "./Input.module.scss";

function Input({ type = "text", placeholder = "", isBottom = false }) {
  return (
    <input
      className={`${styles.input} ${isBottom ? styles.input__bottom : ""}`}
      type={type}
      placeholder={placeholder}
    />
  );
}

export default Input;
