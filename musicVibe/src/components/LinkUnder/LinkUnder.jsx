import { NavLink } from "react-router-dom";
import styles from "./LinkUnder.module.scss";

function LinkUnder({ path, label = "" }) {
  return (
    <NavLink
      className={({ isActive }) =>
        `${styles["link"]} ${isActive ? styles["link--active"] : ""}`
      }
      to={path}
    >
      <p>{label}</p>
    </NavLink>
  );
}

export default LinkUnder;
