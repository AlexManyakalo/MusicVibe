import { useContext, useState } from "react";
import { PlayerContext } from "@/context/PlayerContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useFavoriteAlbums } from "@/context/FavoriteAlbumsContext";
import { Link } from "react-router-dom";
// Components
import {
  ArrowBtns,
  MenuBtn,
  MenuBtnMusic,
  Input,
  ChartItem,
} from "@/components/index.js";
import { HeartIcon } from "@/components/index.js";
import CommentItem from "@/components/CommentItem/CommentItem";
import LoginImage from "@/assets/images/login.jpg";
// Styles
import styles from "./MediaDetails.module.scss";

function MediaDetails({
  track = {},
  album = [],
  albumInfo = {},
  comments = [],
  onCommentSubmit,
}) {
  const [comment, setComment] = useState("");
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const isAlbumView = Boolean(albumInfo?.id);

  // ПЛЕЕР
  const { playTrack, togglePlayPause, currentTrack, isPlaying } =
    useContext(PlayerContext);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { isFavoriteAlbum, addToFavoriteAlbums, removeFromFavoriteAlbums } =
    useFavoriteAlbums();
  const isCurrent = currentTrack?.id === track.id;

  function handlePlay(e) {
    e.preventDefault();
    if (isCurrent) togglePlayPause();
    else playTrack(track);
  }

  async function handleLike(e) {
    e.preventDefault();
    e.stopPropagation();
    if (isFavoriteLoading) return;

    try {
      setIsFavoriteLoading(true);
      if (isAlbumView) {
        if (isFavoriteAlbum(albumInfo.id)) {
          await removeFromFavoriteAlbums(albumInfo.id);
        } else {
          await addToFavoriteAlbums(albumInfo.id);
        }
      } else {
        if (isFavorite(track.id)) {
          await removeFromFavorites(track.id);
        } else {
          await addToFavorites(track.id);
        }
      }
    } catch (error) {
      console.error("Ошибка при работе с избранным:", error);
    } finally {
      setIsFavoriteLoading(false);
    }
  }

  // Обработка отправки комментария
  async function handleSubmitComment(e) {
    e.preventDefault();
    if (!comment.trim()) return;

    if (onCommentSubmit) {
      await onCommentSubmit(comment);
      setComment("");
    }
  }

  // Обработка изменения комментария
  function handleCommentChange(e) {
    setComment(e.target.value);
  }

  return (
    <>
      <ArrowBtns />
      <div className={styles.track__song}>
        <div className={styles["track__song-block"]}>
          <img
            className={styles.block__image}
            src={isAlbumView ? albumInfo.coverUrl : track.imageUrl}
            alt={isAlbumView ? "Обложка альбома" : "Превью песни"}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.info__top}>
            <h2 className={styles["info__top-title"]}>
              {isAlbumView ? albumInfo.title : track.title}
            </h2>
            <Link
              className={styles["info__top-link"]}
              to={`/musician/${isAlbumView ? albumInfo.artistId : track.artistId}`}
            >
              {isAlbumView ? albumInfo.artistName : track.artistName}
            </Link>
            {isAlbumView && albumInfo.description && (
              <p className={styles["info__top-description"]}>
                {albumInfo.description}
              </p>
            )}
            {!isAlbumView && track.plays && (
              <p className={styles["info__top-plays"]}>
                {track.plays.toLocaleString()} прослушиваний
              </p>
            )}
          </div>
          <div className={styles.info__bottom}>
            {!isAlbumView && (
              <MenuBtnMusic
                label="Слушать"
                isPlaying={isCurrent && isPlaying}
                handlePlay={handlePlay}
              />
            )}
            <button
              className={`${styles["item__right-like"]} ${isAlbumView ? (isFavoriteAlbum(albumInfo.id) ? styles.active : "") : isFavorite(track.id) ? styles.active : ""}`}
              onClick={handleLike}
              disabled={isFavoriteLoading}
            >
              <HeartIcon />
            </button>
          </div>
        </div>
      </div>
      {isAlbumView ? (
        album.map((track, index) => (
          <ChartItem
            key={track.id}
            index={index}
            track={track}
            tracks={album}
          />
        ))
      ) : (
        <ChartItem key={track.id} index={0} track={track} tracks={[track]} />
      )}
      <div className={styles.track__comment}>
        <h2 className={styles["track__comment-title"]}>
          {comments.length} комментариев
        </h2>
        <form className={styles.comment__bottom} onSubmit={handleSubmitComment}>
          <div className={styles["comment__bottom-input"]}>
            <div className={styles["track__comment-block"]}>
              <img
                className={styles["comment__block-image"]}
                src={LoginImage}
                alt="Аватарка пользователя"
              />
            </div>
            <Input
              placeholder="Введите комментарий"
              isComment="true"
              value={comment}
              onChange={handleCommentChange}
            />
          </div>
          <div className={styles.controls}>
            <MenuBtn label="Отмена" onClick={() => setComment("")} />
            <MenuBtn
              label="Отправить"
              type="submit"
              disabled={!comment.trim()}
            />
          </div>
        </form>
      </div>

      <ul className={styles.comments__list}>
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </>
  );
}

export default MediaDetails;
