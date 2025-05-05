import { NavLink } from "react-router-dom";
import styles from "./LayoutNavBtn.module.scss";

const LayoutNavBtn = ({ path, icon, label }) => {
  return (
    <li className={styles["aside__nav-item"]}>
      <NavLink
        className={({ isActive }) =>
          `${styles["aside__nav-link"]} ${isActive ? styles["nav__link--active"] : ""}`
        }
        to={path}
      >
        {icon}
        <p>{label}</p>
      </NavLink>
    </li>
  );
};

export default LayoutNavBtn;
