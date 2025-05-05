import styles from "./MenuBtn.module.scss";

const MenuBtn = ({ label, handlePlay }) => {
  return (
    <button className={styles.menu__btn} onClick={handlePlay}>
      {label}
    </button>
  );
};

export default MenuBtn;
