import styles from "./MenuBtn.module.scss";

const MenuBtn = ({ label }) => {
  return <button className={styles.menu__btn}>{label}</button>;
};

export default MenuBtn;
