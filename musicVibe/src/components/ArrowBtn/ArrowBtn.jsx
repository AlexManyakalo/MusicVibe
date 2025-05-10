import { useNavigate } from "react-router-dom";
import { ArrowIcon } from "@/components/Icons/icons.jsx";
import styles from "./ArrowBtn.module.scss";

function ArrowBtn({ direction = "back" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (direction === "back") {
      navigate(-1);
    } else {
      navigate(1);
    }
  };

  return (
    <button
      className={`${styles.arrow__btn} ${direction === "forward" ? styles.forward : ""}`}
      onClick={handleClick}
    >
      <ArrowIcon />
    </button>
  );
}

export default ArrowBtn;
