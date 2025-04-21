import styles from "./Input.module.scss";

function Input({ type = "text", placeholder = "" }) {
  return (
    <input className={styles.input} type={type} placeholder={placeholder} />
  );
}

export default Input;
