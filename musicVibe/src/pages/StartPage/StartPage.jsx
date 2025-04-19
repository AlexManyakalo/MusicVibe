import styles from "./StartPage.module.scss";

function StartPage() {
  return (
    <div className={`container ${styles.start}`}>
      <div className={styles["start__inner"]}>
        <div className={styles["start__inner-top"]}>
          <h1 className={styles["start__inner-title"]}>MusicVibe</h1>
          <p
            className={`${styles["start__inner-paragraph"]} ${styles["start__inner-paragraph--big"]}`}
          >
            Добро пожаловать!
          </p>
        </div>
        <div className={styles["start__inner-bottom"]}>
          <a className={styles["start__inner-btn"]} href="#">
            Войти
          </a>
          <p className={styles["start__inner-paragraph"]}>
            Нет аккаунта?{" "}
            <a className={`${styles["start__inner-paragraph"]} link`} href="#">
              Регистрация
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
