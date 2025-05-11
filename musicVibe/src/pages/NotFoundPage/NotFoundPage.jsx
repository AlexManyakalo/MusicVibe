import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";

function NotFoundPage() {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__content}>
        <h1 className={styles.notFound__title}>404</h1>
        <p className={styles.notFound__text}>
          Ой! Похоже, вы заблудились в музыкальном космосе
        </p>
        <Link to="/" className={styles.notFound__button}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
