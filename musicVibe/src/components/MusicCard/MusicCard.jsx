import { Link } from "react-router-dom";
import { PlayIcon, HeartIcon } from "@/components/Icons/icons.jsx";
import styles from "./MusicCard.module.scss";

function MusicCard({ track }) {
  return (
    <li className={styles.item}>
      <Link className={styles["item__block-link"]} to={`/track/${track.id}`}>
        <img
          className={styles.block__image}
          src={track.image}
          alt={track.title}
        />
        <div className={styles.link__controls}>
          <button className={styles.controls__play}>
            <PlayIcon />
          </button>
          <button className={styles.controls__like}>
            <HeartIcon />
          </button>
        </div>
      </Link>
      <div className={styles.item__text}>
        <h3 className={styles.item__title}>
          <Link to={`/track/${track.id}`}>{track.title}</Link>
        </h3>
        <Link className={styles.item__link} to={`/musician/${track.artistId}`}>
          {track.artistName}
        </Link>
      </div>
    </li>
  );
}

export default MusicCard;
