import { Link } from "react-router-dom";
// Components
import {
  ArrowBtns,
  MenuBtn,
  MenuBtnMusic,
  Input,
  ChartItem,
  Loader,
} from "@/components/index.js";
import { HeartIcon } from "@/components/index.js";
import LoginImage from "@/assets/images/login.jpg";
// Styles
import styles from "./MediaDetails.module.scss";

function MediaDetails() {
  return (
    <>
      <ArrowBtns />
      <div className={styles.track__song}>
        <div className={styles["track__song-block"]}>
          <img
            className={styles.block__image}
            src={track.imageUrl}
            alt="Превью песни"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.info__top}>
            <h2 className={styles["info__top-title"]}>{track.title}</h2>
            <Link
              className={styles["info__top-link"]}
              to={`/musician/${track.artistId}`}
            >
              {track.artistName}
            </Link>
          </div>
          <div className={styles.info__bottom}>
            <MenuBtnMusic
              label="Слушать"
              isPlaying={isCurrent && isPlaying}
              handlePlay={handlePlay}
            />
            <button
              className={styles["item__right-like"]}
              onClick={e => {
                e.stopPropagation();
              }}
            >
              <HeartIcon />
            </button>
          </div>
        </div>
      </div>
      {tracks.map((track, index) => (
        <ChartItem key={track.id} index={index} track={track} />
      ))}
      <div className={styles.track__comment}>
        <h2 className={styles["track__comment-title"]}>10 комментариев</h2>
        <form className={styles.comment__bottom}>
          <div className={styles["comment__bottom-input"]}>
            <div className={styles["track__comment-block"]} href="#">
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
              label="Оставить комментарий"
              type="submit"
              disabled={!comment.trim()}
            />
          </div>
        </form>
      </div>
      <ul className={styles.comments__list}>
        <li className={styles.comments__item}>
          <Link className={styles.comments__block} to={`/musician/1`}>
            <img
              className={styles["comments__block-image"]}
              src={LoginImage}
              alt="Аватарка пользователя"
            />
          </Link>
          <div className={styles.comment}>
            <h4 className={styles.comments__title}>
              <Link to={`/musician/1`}>Александр</Link>
            </h4>
            <p className={styles.comments__paragraph}>
              Далеко-далеко за словесными горами в стране гласных и согласных
              живут рыбные тексты.
            </p>
          </div>
        </li>
      </ul>
    </>
  );
}

export default MediaDetails;
