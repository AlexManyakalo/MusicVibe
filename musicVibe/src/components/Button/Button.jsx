import styles from "./Button.module.scss";

function Button({ text }) {
  return (
    <a className={styles.btn} href="#">
      {text}
    </a>
  );
}

export default Button;
