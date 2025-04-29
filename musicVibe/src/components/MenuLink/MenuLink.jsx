import styles from "./MenuLink.module.scss";

const MenuLink = ({ label }) => {
  return (
    <a href="#" className={styles.menu__btn}>
      {label}
    </a>
  );
};

export default MenuLink;
