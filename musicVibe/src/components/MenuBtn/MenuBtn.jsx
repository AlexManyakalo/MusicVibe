import styles from "./MenuBtn.module.scss";

function MenuBtn({ label }) {
  return <button className={styles.menu__btn}>{label}</button>;
}

export default MenuBtn;
