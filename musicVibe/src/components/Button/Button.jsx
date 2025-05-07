import styles from "./Button.module.scss";

function Button({ type, text, selected = false, onClick }) {
  return (
    <button
      type={type}
      className={selected ? styles.btn : styles["btn--disabled"]}
      disabled={!selected}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
