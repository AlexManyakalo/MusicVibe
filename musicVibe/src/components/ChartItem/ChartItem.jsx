import { Link } from "react-router-dom";
import styles from "./ChartItem.module.scss";
import { PlayIcon, HeartIcon } from "@/components/Icons/icons.jsx";

function ChartItem({ index, track }) {
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
          <img
            src={track.image}
            alt="Превью песни"
            className={styles.block__image}
          />
          <PlayIcon />
        </div>
        <div className={styles["item__left-text"]}>
          <h3 className={styles["text__title"]}>
            <Link
              to={`/track/${track.id}`}
              onClick={e => {
                e.stopPropagation();
              }}
            >
              {track.title}
            </Link>
          </h3>
          <Link
            className={styles["text__link"]}
            to={`/musician/${track.artistId}`}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            {track.artistName}
          </Link>
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
