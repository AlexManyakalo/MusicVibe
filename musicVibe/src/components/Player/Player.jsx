import {
  HeartIcon,
  PauseIcon,
  NextIcon,
  RandomIcon,
  SoundIcon,
} from "@/components/Icons/icons.jsx";
import loginImage from "@/assets/images/login.jpg";
import styles from "./Player.module.scss";

function Player() {
  return (
    <div className={styles.player}>
      <div className={styles.player__left}>
        <div className={styles["left__block-image"]}>
          <img className={styles.block__image} src={loginImage} />
        </div>
        <div className={styles.left__info}>
          <h4 className={styles["left__info-title"]}>
            <a href="#">Название песни</a>
          </h4>
          <a className={styles["left__info-link"]} href="#">
            Артист
          </a>
        </div>
        <button className={styles.left__btn}>
          <HeartIcon />
        </button>
      </div>
      <div className={styles.player__center}>
        <div className={styles.center__controls}>
          <button>
            <RandomIcon />
          </button>
          <div className={styles.controls__player}>
            <button>
              <NextIcon />
            </button>
            <button>
              <PauseIcon />
            </button>
            <button>
              <NextIcon className={styles["controls__player-next"]} />
            </button>
          </div>
          <button>
            <SoundIcon />
          </button>
        </div>
        <div className={styles.center__progress}>
          <div className={styles.progress__time}>00:00</div>
          <div className={styles.progress}>
            <div className={styles["progress--filled"]}></div>
          </div>
          <div className={styles.progress__time}>02:33</div>
        </div>
      </div>
    </div>
  );
}

export default Player;
