import { useContext } from "react";
import { PlayerContext } from "@/context/PlayerContext";
import { Link } from "react-router-dom";
// Components
import { PlayIcon, PauseIcon, HeartIcon } from "@/components/index.js";
// Styles
import styles from "./MusicCard.module.scss";

function MusicCard({ item, isAlbum }) {
  const { playTrack, togglePlayPause, currentTrack, isPlaying } =
    useContext(PlayerContext);

  const isCurrent = !isAlbum && currentTrack?.id === item.id;

  function handlePlay(e) {
    e.preventDefault(); // предотвращаем переход по ссылке

    if (isAlbum) {
      // TODO: Добавить логику воспроизведения альбома
      return;
    }

    if (isCurrent) togglePlayPause();
    else playTrack(item);
  }

  const linkUrl = isAlbum ? `/album/${item.id}` : `/track/${item.id}`;
  const imageUrl = isAlbum ? item.coverUrl : item.imageUrl;

  return (
    <li className={styles.item}>
      <Link className={styles["item__block-link"]} to={linkUrl}>
        <img className={styles.block__image} src={imageUrl} alt={item.title} />
        <div className={styles.link__controls}>
          <button className={styles.controls__play} onClick={handlePlay}>
            {isCurrent && isPlaying ? (
              <PauseIcon className={styles.pause__btn} />
            ) : (
              <PlayIcon />
            )}
          </button>
          <button className={styles.controls__like}>
            <HeartIcon />
          </button>
        </div>
      </Link>
      <div className={styles.item__text}>
        <h3 className={styles.item__title}>
          <Link to={linkUrl}>{item.title}</Link>
        </h3>
        <Link className={styles.item__link} to={`/musician/${item.artistId}`}>
          {item.artistName}
        </Link>
        {isAlbum && <span className={styles.item__year}>{item.year}</span>}
      </div>
    </li>
  );
}

export default MusicCard;
