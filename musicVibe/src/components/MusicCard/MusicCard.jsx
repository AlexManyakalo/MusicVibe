import { useContext, useState } from "react";
import { PlayerContext } from "@/context/PlayerContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useFavoriteAlbums } from "@/context/FavoriteAlbumsContext";
import { Link } from "react-router-dom";
// Components
import { PlayIcon, PauseIcon, HeartIcon } from "@/components/index.js";
// Styles
import styles from "./MusicCard.module.scss";

function MusicCard({ item, isAlbum, tracks = [] }) {
  const { playTrack, togglePlayPause, currentTrack, isPlaying } =
    useContext(PlayerContext);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { isFavoriteAlbum, addToFavoriteAlbums, removeFromFavoriteAlbums } =
    useFavoriteAlbums();
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

  const isCurrent = !isAlbum && currentTrack?.id === item.id;

  function handlePlay(e) {
    e.preventDefault();

    if (isAlbum) {
      // TODO: Добавить логику воспроизведения альбома
      return;
    }

    if (isCurrent) togglePlayPause();
    else playTrack(item, tracks);
  }

  async function handleLike(e) {
    e.preventDefault();
    e.stopPropagation();
    if (isFavoriteLoading) return;

    try {
      setIsFavoriteLoading(true);
      if (isAlbum) {
        if (isFavoriteAlbum(item.id)) {
          await removeFromFavoriteAlbums(item.id);
        } else {
          await addToFavoriteAlbums(item.id);
        }
      } else {
        if (isFavorite(item.id)) {
          await removeFromFavorites(item.id);
        } else {
          await addToFavorites(item.id);
        }
      }
    } catch (error) {
      console.error("Ошибка при работе с избранным:", error);
    } finally {
      setIsFavoriteLoading(false);
    }
  }

  const linkUrl = isAlbum ? `/album/${item.id}` : `/track/${item.id}`;
  const imageUrl = isAlbum ? item.coverUrl : item.imageUrl;
  const isItemFavorite = isAlbum
    ? isFavoriteAlbum(item.id)
    : isFavorite(item.id);

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
          <button
            className={`${styles.controls__like} ${isItemFavorite ? styles.active : ""}`}
            onClick={handleLike}
            disabled={isFavoriteLoading}
          >
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
