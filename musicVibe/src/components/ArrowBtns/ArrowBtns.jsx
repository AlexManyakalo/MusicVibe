import { useNavigate } from "react-router-dom";
import { ArrowIcon } from "@/components/index.js";
import styles from "./ArrowBtns.module.scss";

function ArrowBtns() {
  const navigate = useNavigate();

  return (
    <div className={styles.arrow__btns}>
      <button className={styles.arrow__btn} onClick={() => navigate(-1)}>
        <ArrowIcon />
      </button>
      <button
        className={`${styles.arrow__btn} ${styles.forward}`}
        onClick={() => navigate(1)}
      >
        <ArrowIcon />
      </button>
    </div>
  );
}

export default ArrowBtns;
