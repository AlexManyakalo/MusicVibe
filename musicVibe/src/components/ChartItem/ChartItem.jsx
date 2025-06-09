import { useContext, useState, useEffect } from "react";
import { PlayerContext } from "@/context/PlayerContext";
import { useFavorites } from "@/context/FavoritesContext";
import { formatTime } from "@/utils/formatTime.js";
import { Link } from "react-router-dom";
// Components
import { PlayIcon, PauseIcon, HeartIcon } from "@/components/index.js";
// Styles
import styles from "./ChartItem.module.scss";

function ChartItem({ index, track }) {
  const { playTrack, togglePlayPause, currentTrack, isPlaying, audio } =
    useContext(PlayerContext);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const [currentTime, setCurrentTime] = useState(0);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const isCurrent = currentTrack?.id === track.id;
  const duration = track.duration || 0; // используем duration из базы

  const displayTime = isCurrent && audio ? currentTime : duration;

  useEffect(() => {
    if (!audio || currentTrack?.id !== track.id) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audio, currentTrack, track]);

  function handlePlay(e) {
    e.preventDefault();

    if (isCurrent) togglePlayPause();
    else playTrack(track);
  }

  async function handleLike(e) {
    e.stopPropagation();
    if (isFavoriteLoading) return;

    try {
      setIsFavoriteLoading(true);
      if (isFavorite(track.id)) {
        removeFromFavorites(track.id);
      } else {
        addToFavorites(track.id);
      }
    } catch (error) {
      console.error("Ошибка при работе с избранным:", error);
    } finally {
      setIsFavoriteLoading(false);
    }
  }

  return (
    <li className={styles.chart__item} onClick={handlePlay}>
      <div className={styles.item__left}>
        <div className={styles["item__left-num"]}>{index + 1}</div>
        <div className={styles["item__left-block"]}>
          <img
            src={track.imageUrl}
            alt="Превью песни"
            className={styles.block__image}
          />
          {isCurrent && isPlaying ? (
            <PauseIcon className={styles.pause__btn} />
          ) : (
            <PlayIcon />
          )}
        </div>
        <div className={styles["item__left-text"]}>
          <h3 className={styles["text__title"]}>
            <Link to={`/track/${track.id}`} onClick={e => e.stopPropagation()}>
              {track.title}
            </Link>
          </h3>
          <Link
            className={styles["text__link"]}
            to={`/musician/${track.artistId}`}
            onClick={e => e.stopPropagation()}
          >
            {track.artistName}
          </Link>
        </div>
      </div>
      <div className={styles.item__right}>
        <button
          className={`${styles["item__right-like"]} ${isFavorite(track.id) ? styles.active : ""}`}
          onClick={handleLike}
          disabled={isFavoriteLoading}
        >
          <HeartIcon />
        </button>
        <p className={styles["item__right-time"]}>{formatTime(displayTime)}</p>
      </div>
    </li>
  );
}

export default ChartItem;
