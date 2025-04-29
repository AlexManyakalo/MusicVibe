import { Link } from "react-router";
import styles from "./StartPage.module.scss";

function StartPage() {
  return (
    <div className={`container ${styles.start}`}>
      <section className={styles["start__inner"]}>
        <div className={styles["start__inner-top"]}>
          <h1 className={styles["start__inner-title"]}>MusicVibe</h1>
          <p
            className={`${styles["start__inner-paragraph"]} ${styles["start__inner-paragraph--big"]}`}
          >
            Добро пожаловать!
          </p>
        </div>
        <div className={styles["start__inner-bottom"]}>
          <Link className={styles["start__inner-link"]} to="/login">
            Войти
          </Link>
          <p className={styles["start__inner-paragraph"]}>
            Нет аккаунта?{" "}
            <Link
              className={`${styles["start__inner-paragraph"]} link`}
              to={"/register"}
            >
              Регистрация
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default StartPage;
