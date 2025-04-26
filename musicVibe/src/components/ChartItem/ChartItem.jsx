import styles from "./ChartItem.module.scss";
import { PlayIcon, HeartIcon } from "@/components/Icons/icons.jsx";

function ChartItem({ index, children }) {
  function handlePlay() {
    console.log(`Play`);
  }
  function handleLike() {
    console.log(`Like`);
  }

  return (
    <li className={styles.chart__item} onClick={handlePlay}>
      <div className={styles.item__left}>
        <p className={styles["item__left-num"]}>{index + 1}</p>
        <div className={styles["item__left-block"]}>
          <img src={children} alt="" className={styles.block__image} />
          <PlayIcon />
        </div>
        <div className={styles["item__left-text"]}>
          <h3 className={styles["text__title"]}>
            <a
              href="#"
              onClick={e => {
                e.stopPropagation();
              }}
            >
              Название песни
            </a>
          </h3>
          <a
            className={styles["text__link"]}
            href="#"
            onClick={e => {
              e.stopPropagation();
            }}
          >
            Артист
          </a>
        </div>
      </div>
      <div className={styles.item__right}>
        <button
          className={styles["item__right-like"]}
          onClick={e => {
            e.stopPropagation();
            handleLike();
          }}
        >
          <HeartIcon />
        </button>
        <p className={styles["item__right-time"]}>02:33</p>
      </div>
    </li>
  );
}

export default ChartItem;
