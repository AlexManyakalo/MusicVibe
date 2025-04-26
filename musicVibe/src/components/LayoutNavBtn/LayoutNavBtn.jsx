import styles from "./LayoutNavBtn.module.scss";

const LayoutNavBtn = ({ icon, label }) => {
  return (
    <li className={styles["aside__nav-item"]}>
      <a href="#" className={styles["aside__nav-link"]}>
        {icon}
        <p>{label}</p>
      </a>
    </li>
  );
};

export default LayoutNavBtn;
