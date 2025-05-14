import { MiniPlayIcon, MiniPauseIcon } from "@/components/index.js";
import styles from "./MenuBtnMusic.module.scss";

function MenuBtnMusic ({ label, handlePlay, isPlaying = false }) {
  return (
    <button className={styles.menu__btn} onClick={handlePlay}>
      {label}
      {isPlaying ? (
        <MiniPauseIcon className={styles.pause__btn} />
      ) : (
        <MiniPlayIcon className={styles.play__btn} />
      )}
    </button>
  );
};

export default MenuBtnMusic;
