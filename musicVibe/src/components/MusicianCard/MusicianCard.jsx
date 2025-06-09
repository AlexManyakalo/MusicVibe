import { Link } from "react-router-dom";
// Components
import { PlayIcon, PauseIcon, HeartIcon } from "@/components/index.js";
// Styles
import styles from "./MusicianCard.module.scss";

function MusicianCard({ musician }) {
  return (
    <li className={styles.item}>
      <Link
        className={styles["item__block-link"]}
        to={`/musician/${musician.id}`}
      >
        <img
          className={styles.block__image}
          src={musician.avatarUrl}
          alt={`Аватарка ${musician.username}`}
        />
      </Link>
      <div className={styles.item__text}>
        <h3 className={styles.item__title}>
          <Link to={`/musician/${musician.id}`}>{musician.username}</Link>
        </h3>
      </div>
    </li>
  );
}

export default MusicianCard;
