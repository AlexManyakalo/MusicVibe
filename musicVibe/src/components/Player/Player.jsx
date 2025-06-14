import { useContext, useState, useEffect } from "react";
import { PlayerContext } from "@/context/PlayerContext";
import { useFavorites } from "@/context/FavoritesContext";
import { formatTime } from "@/utils/formatTime.js";
import { Link } from "react-router-dom";
// Components
import {
  HeartIcon,
  PlayIcon,
  PauseIcon,
  NextIcon,
  RandomIcon,
  SoundIcon,
} from "@/components/index.js";
// Styles
import styles from "./Player.module.scss";

function Player() {
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    nextTrack,
    previousTrack,
    audio,
    toggleMute,
  } = useContext(PlayerContext);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [audio, currentTrack]);

  const handleProgressClick = e => {
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  async function handleLike(e) {
    e.preventDefault();
    e.stopPropagation();
    if (isFavoriteLoading || !currentTrack) return;

    try {
      setIsFavoriteLoading(true);
      if (isFavorite(currentTrack.id)) {
        await removeFromFavorites(currentTrack.id);
      } else {
        await addToFavorites(currentTrack.id);
      }
    } catch (error) {
      console.error("Ошибка при работе с избранным:", error);
    } finally {
      setIsFavoriteLoading(false);
    }
  }

  if (!currentTrack) return null;

  return (
    <div className={styles.player}>
      <div className={styles.player__left}>
        <div className={styles["left__block-image"]}>
          <img className={styles.block__image} src={currentTrack.imageUrl} />
        </div>
        <div className={styles.left__info}>
          <h4 className={styles["left__info-title"]}>
            <Link to={`/track/${currentTrack.id}`}>{currentTrack.title}</Link>
          </h4>
          <Link
            className={styles["left__info-link"]}
            to={`/musician/${currentTrack.artistId}`}
          >
            {currentTrack.artistName}
          </Link>
        </div>
        <button
          className={`${styles.left__btn} ${isFavorite(currentTrack.id) ? styles.active : ""}`}
          onClick={handleLike}
          disabled={isFavoriteLoading}
        >
          <HeartIcon />
        </button>
      </div>

      <div className={styles.player__center}>
        <div className={styles.center__controls}>
          <button>
            <RandomIcon />
          </button>
          <div className={styles.controls__player}>
            <button onClick={previousTrack}>
              <NextIcon />
            </button>
            <button onClick={togglePlayPause}>
              {isPlaying ? (
                <PauseIcon />
              ) : (
                <PlayIcon className={styles.play__btn} />
              )}
            </button>
            <button onClick={nextTrack}>
              <NextIcon className={styles["controls__player-next"]} />
            </button>
          </div>
          <button onClick={toggleMute}>
            <SoundIcon />
          </button>
        </div>

        <div className={styles.center__progress}>
          <div className={styles.progress__time}>{formatTime(currentTime)}</div>
          <div className={styles.progress} onClick={handleProgressClick}>
            <div
              className={styles["progress--filled"]}
              style={{
                width: duration ? `${(currentTime / duration) * 100}%` : "0%",
              }}
            ></div>
            <div
              className={styles["progress__thumb"]}
              style={{
                left: duration ? `${(currentTime / duration) * 100}%` : "0%",
              }}
            ></div>
          </div>
          <div className={styles.progress__time}>{formatTime(duration)}</div>
        </div>
      </div>
    </div>
  );
}

export default Player;
