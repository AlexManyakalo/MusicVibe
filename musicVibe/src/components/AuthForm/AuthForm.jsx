import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import api from "@/api";
// Components
import loginImage from "@/assets/images/login.jpg";
import { Button, Input, Notification } from "@/components/index.js";
// Styles
import styles from "./AuthForm.module.scss";

// Схема валидации для регистрации
const registerSchema = z
  .object({
    name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    email: z.string().email("Некорректный email"),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

// Схема валидации для входа
const loginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

function AuthForm({ type }) {
  const isLogin = type === "login";
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [notification, setNotification] = useState(null);

  // Состояние полей и ошибок
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // Проверка валидности формы при изменении данных
  useEffect(() => {
    async function validateForm() {
      try {
        const schema = isLogin ? loginSchema : registerSchema;
        const dataToValidate = isLogin
          ? { email: formData.email, password: formData.password }
          : formData;

        schema.parse(dataToValidate);
        setIsFormValid(true);
      } catch (err) {
        if (err instanceof z.ZodError) {
          const newErrors = {};
          err.errors.forEach(error => {
            newErrors[error.path[0]] = error.message;
          });
          setErrors(newErrors);
        }
        setIsFormValid(false);
      }
    };

    validateForm();
  }, [formData, isLogin]);

  // Обработка изменения в input
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }

  // Отправка формы
  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});

    try {
      // Валидация данных
      const schema = isLogin ? loginSchema : registerSchema;
      const dataToValidate = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const validatedData = schema.parse(dataToValidate);

      const urlServer = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin
        ? {
            email: validatedData.email,
            password: validatedData.password,
          }
        : {
            name: validatedData.name,
            email: validatedData.email,
            password: validatedData.password,
          };

      const res = await api.post(urlServer, payload);
      // Перенаправляем на разные страницы в зависимости от типа формы
      navigate(isLogin ? "/home" : "/genres");
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Обработка ошибок валидации
        const newErrors = {};
        err.errors.forEach(error => {
          newErrors[error.path[0]] = error.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Ошибка авторизации:", err);
        setNotification({
          message: isLogin
            ? "Неверный email или пароль"
            : "Такой email уже зарегистрирован",
          type: "error",
        });
      }
    }
  }

  return (
    <div className="container container--flex">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
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
              to={"/auth/login"}
            >
              Авторизация
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${styles.switch__btn} ${isActive ? styles["switch__btn--active"] : ""}`
              }
              to={"/auth/register"}
            >
              Регистрация
            </NavLink>
          </div>
          <form className={styles["auth__right-form"]} onSubmit={handleSubmit}>
            {!isLogin && (
              <Input
                type="text"
                name="name"
                placeholder="Имя"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />
            )}
            <Input
              type="email"
              name="email"
              placeholder="Почта"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />
            {!isLogin && (
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Повторите пароль"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
              />
            )}
            <Button
              type="submit"
              text={isLogin ? "Войти" : "Зарегистрироваться"}
              selected={isFormValid}
            />
          </form>
        </div>
      </section>
    </div>
  );
}

export default AuthForm;
