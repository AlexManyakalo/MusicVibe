import ChartItem from "@/components/ChartItem/ChartItem.jsx";
import MenuBtn from "@/components/MenuBtn/MenuBtn.jsx";
import Input from "@/components/Input/Input.jsx";
import { HeartIcon } from "@/components/Icons/icons.jsx";
import LoginImage from "@/assets/images/login.jpg";
import styles from "./TrackPage.module.scss";

function TrackPage({ songs }) {
  return (
    <>
      <div className={styles.track__song}>
        <div className={styles["track__song-block"]}>
          <img
            className={styles.block__image}
            src={songs[0].image}
            alt="Превью песни"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.info__top}>
            <h2 className={styles["info__top-title"]}>Название трека</h2>
            <a className={styles["info__top-link"]} href="#">
              Артист
            </a>
          </div>
          <div className={styles.info__bottom}>
            <MenuBtn label="Слушать" />
            <button
              className={styles["item__right-like"]}
              onClick={e => {
                e.stopPropagation();
                handleLike();
              }}
            >
              <HeartIcon />
            </button>
          </div>
        </div>
      </div>
      {songs.map((song, index) => (
        <ChartItem key={song.id} index={index} image={song.image} />
      ))}
      <div className={styles.track__comment}>
        <h2 className={styles["track__comment-title"]}>10 комментариев</h2>
        <div className={styles.comment__bottom}>
          <div className={styles["comment__bottom-input"]}>
            <div className={styles["track__comment-block"]} href="#">
              <img
                className={styles["comment__block-image"]}
                src={LoginImage}
                alt="Аватарка пользователя"
              />
            </div>
            <Input placeholder="Введите комментарий" isBottom="true" />
          </div>
          <div className={styles.controls}>
            <MenuBtn label="Отмена" />
            <MenuBtn label="Оставить комментарий" />
          </div>
        </div>
      </div>
      <ul className={styles.comments__list}>
        <li className={styles.comments__item}>
          <a className={styles.comments__block} href="#">
            <img
              className={styles["comments__block-image"]}
              src={LoginImage}
              alt="Аватарка пользователя"
            />
          </a>
          <div className={styles.comment}>
            <h4 className={styles.comments__title}>
              <a href="#">Александр</a>
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

export default TrackPage;
