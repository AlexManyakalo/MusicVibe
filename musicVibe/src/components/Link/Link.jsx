import styles from "./Link.module.scss";

function Link({ text }) {
  return (
    <a className={styles.btn} href="#">
      {text}
    </a>
  );
}

export default Link;
