import { useEffect, useState } from "react";
import api from "@/api";
// Components
import {
  ArrowBtns,
  MenuBtn,
  LinkUnder,
  Input,
  Loader,
  Tooltip,
} from "@/components/index.js";
import { QuestionIcon, ArrowUpIcon } from "@/components/index.js";
// Styles
import styles from "./ProfilePage.module.scss";
import LoginImage from "@/assets/images/login.jpg";

function ProfilePage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const tooltips = {
    avatar:
      "Загрузите фотографию для вашего профиля. Рекомендуемый размер: 500x500 пикселей.",
    username:
      "Выберите уникальное имя пользователя. Оно будет отображаться в вашем профиле.",
    email:
      "Укажите вашу электронную почту для восстановления доступа к аккаунту.",
    password: "Создайте надежный пароль для защиты вашего аккаунта.",
    additional: "Управление аккаунтом: выход из системы или удаление аккаунта.",
  };

  useEffect(() => {
    async function fetchUser() {
      setLoading(false);
    }
    fetchUser();
  }, []);

  // Обработка изменения поиска
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  // Обработка раскрытия/скрытия блока
  function toggleExpanded() {
    setIsExpanded(prev => !prev);
  }

  if (loading) return <Loader />;

  return (
    <>
      <div className={styles.profile__top}>
        <ArrowBtns />
        <h3 className={styles["profile__page-title"]}>Профиль</h3>
      </div>
      <div className={styles.profile__btns}>
        <div className={styles["profile__btns-left"]}>
          <LinkUnder path="/" label="Профиль" />
          <LinkUnder path="/" label="Карточка" />
        </div>
        <div className={styles["profile__btns-right"]}>
          <MenuBtn label="Отмена" />
          <MenuBtn label="Сохранить" disabled={true} />
        </div>
      </div>
      <div className={styles.profile__avatar}>
        <div className={styles.top__block}>
          <h4 className={styles["profile__title"]}>Фото профиля</h4>
          <Tooltip content={tooltips.avatar}>
            <button className={styles["profile__question-btn"]}>
              <QuestionIcon />
            </button>
          </Tooltip>
        </div>
        <div className={styles.avatar__bottom}>
          <div className={styles.profile__block}>
            <img
              src={LoginImage}
              alt="Ваша аватарка"
              className={styles.profile__image}
            />
          </div>
          <div className={styles["profile__avatar-btns"]}>
            <MenuBtn label="Изменить" />
            <MenuBtn label="Удалить" danger={true} />
          </div>
        </div>
      </div>
      <div className={styles["profile__settings-block"]}>
        <div className={styles.top__block}>
          <h4 className={styles["profile__title"]}>Имя пользователя</h4>
          <Tooltip content={tooltips.username}>
            <button className={styles["profile__question-btn"]}>
              <QuestionIcon />
            </button>
          </Tooltip>
        </div>
        <Input
          placeholder="Имя пользователя"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className={styles["profile__settings-block"]}>
        <div className={styles.top__block}>
          <h4 className={styles["profile__title"]}>Почта</h4>
          <Tooltip content={tooltips.email}>
            <button className={styles["profile__question-btn"]}>
              <QuestionIcon />
            </button>
          </Tooltip>
        </div>
        <Input
          type="email"
          placeholder="email@mail.ru"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className={styles["profile__settings-block"]}>
        <div className={styles.top__block}>
          <h4 className={styles["profile__title"]}>Сменить пароль</h4>
          <Tooltip content={tooltips.password}>
            <button className={styles["profile__question-btn"]}>
              <QuestionIcon />
            </button>
          </Tooltip>
        </div>
        <Input
          type="password"
          placeholder="******"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className={styles["profile__settings-block"]}>
        <div className={styles.top__block}>
          <button
            className={`${styles["profile__add-btn"]} ${!isExpanded ? styles["profile__add-btn--collapsed"] : ""}`}
            onClick={toggleExpanded}
          >
            <ArrowUpIcon />
            <h4 className={styles["profile__title"]}>Дополнитель</h4>
          </button>
          <Tooltip content={tooltips.additional}>
            <button className={styles["profile__question-btn"]}>
              <QuestionIcon />
            </button>
          </Tooltip>
        </div>
        <div
          className={`${styles["profile__buttons-wrapper"]} ${!isExpanded ? styles["profile__buttons-wrapper--collapsed"] : ""}`}
        >
          <MenuBtn label="Выйти из аккаунта" danger={true} />
          <MenuBtn label="Удалить аккаунт" danger={true} />
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
