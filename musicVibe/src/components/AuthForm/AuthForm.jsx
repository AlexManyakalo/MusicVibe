import loginImage from "../../assets/images/login.jpg";
import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./AuthForm.module.scss";

function AuthForm({ type }) {
  const isLogin = type === "login";

  return (
    <div className="container container--flex">
      <div className={styles.auth}>
        <div className={styles.auth__left}>
          <img
            className={styles["auth__left-image"]}
            src={loginImage}
            alt={`Страница ${isLogin ? "входа" : "регистрации"}`}
            loading="lazy"
          />
        </div>
        <div className={styles.auth__right}>
          <div className={styles["auth__right-switch"]}>
            <a
              className={`${styles.switch__btn} ${styles["switch__btn--active"]}`}
              href="#"
            >
              Авторизация
            </a>
            <a className={styles.switch__btn} href="#">
              Регистрация
            </a>
          </div>
          <form className={styles["auth__right-form"]}>
            {!isLogin && <Input type="text" placeholder="Имя" />}
            <Input type="email" placeholder="Почта" />
            <Input type="password" placeholder="Пароль" />
            {!isLogin && (
              <Input type="password" placeholder="Повторите пароль" />
            )}
            <Button text={isLogin ? "Войти" : "Зарегистрироваться"} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
