import { PlayIcon, HeartIcon } from "@/components/Icons/icons.jsx";
import styles from "./MusicCard.module.scss";

function MusicCard({ children }) {
  return (
    <li className={styles.item}>
      <a className={styles["item__block-link"]} href="#">
        <img
          className={styles.block__image}
          src={children}
          alt="Название песни"
        />
        <div className={styles.link__controls}>
          <button className={styles.controls__play}>
            <PlayIcon />
          </button>
          <button className={styles.controls__like}>
            <HeartIcon />
          </button>
        </div>
      </a>
      <div className={styles.item__text}>
        <h3 className={styles.item__title}>
          <a href="#">Название песни</a>
        </h3>
        <a className={styles.item__link} href="#">
          Артист
        </a>
      </div>
    </li>
  );
}

export default MusicCard;
