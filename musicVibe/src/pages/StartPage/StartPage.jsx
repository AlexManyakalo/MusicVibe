import Link from "../../components/Link/Link.jsx";
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
          <Link text="Войти" />
          <p className={styles["start__inner-paragraph"]}>
            Нет аккаунта?{" "}
            <a className={`${styles["start__inner-paragraph"]} link`} href="#">
              Регистрация
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

export default StartPage;
