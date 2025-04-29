import { NavLink } from "react-router-dom";
import loginImage from "@/assets/images/login.jpg";
import Button from "@/components/Button/Button.jsx";
import Input from "@/components/Input/Input";
import styles from "./AuthForm.module.scss";

function AuthForm({ type }) {
  const isLogin = type === "login";

  return (
    <div className="container container--flex">
      <section className={styles.auth}>
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
            <NavLink
              className={({ isActive }) =>
                `${styles.switch__btn} ${isActive ? styles["switch__btn--active"] : ""}`
              }
              to={"/login"}
            >
              Авторизация
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${styles.switch__btn} ${isActive ? styles["switch__btn--active"] : ""}`
              }
              to={"/register"}
            >
              Регистрация
            </NavLink>
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
      </section>
    </div>
  );
}

export default AuthForm;
