import styles from "./Button.module.scss";

function Button({ text, selected = false, onClick }) {
  return (
    <button
      className={selected ? styles.btn : styles["btn--disabled"]}
      disabled={!selected}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
