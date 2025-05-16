import styles from "./MenuLink.module.scss";

const MenuLink = ({ label, path }) => {
  return (
    <a href={path} className={styles.menu__btn} target="_blank">
      {label}
    </a>
  );
};

export default MenuLink;
