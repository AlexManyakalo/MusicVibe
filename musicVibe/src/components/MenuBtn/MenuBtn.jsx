import styles from "./MenuBtn.module.scss";

function MenuBtn({
  label,
  disabled = false,
  danger = false,
  type = "button",
  onClick,
}) {
  return (
    <button
      className={`${styles.menu__btn} ${disabled ? styles.disabled : ""} ${danger ? styles.danger : ""}`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default MenuBtn;
