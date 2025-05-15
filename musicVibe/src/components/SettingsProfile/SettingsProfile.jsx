import { useState } from "react";
import api from "@/api";
// Components
import {
  ArrowBtns,
  MenuBtn,
  LinkUnder,
  Input,
  Tooltip,
} from "@/components/index.js";
import { QuestionIcon, ArrowUpIcon } from "@/components/index.js";
// Styles
import styles from "./SettingsProfile.module.scss";
import LoginImage from "@/assets/images/login.jpg";

function SettingsProfile({ type }) {
  const [username, setUsername] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(LoginImage);
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);

  const isProfile = type === "profile";
  const tooltips = {
    avatar:
      "Загрузите фотографию для вашего профиля. Рекомендуемый размер: 500x500 пикселей.",
    username:
      "Выберите уникальное имя пользователя. Оно будет отображаться в вашем профиле.",
    email:
      "Укажите вашу электронную почту для восстановления доступа к аккаунту.",
    password: "Создайте надежный пароль для защиты вашего аккаунта.",
    additional: "Управление аккаунтом: выход из системы или удаление аккаунта.",
    banner:
      "Загрузите баннер для вашего профиля. Рекомендуемый размер: 1200x300 пикселей. Это изображение будет отображаться в верхней части вашего профиля.",
    about:
      "Расскажите о себе, своих музыкальных предпочтениях и интересах. Это поможет другим пользователям лучше узнать вас.",
    contacts:
      "Укажите свои контактные данные для связи. Вы можете добавить телефон, мессенджеры и другие способы связи.",
    links:
      "Добавьте ссылки на ваши социальные сети, музыкальные платформы или личный сайт. Это поможет другим пользователям найти вас в других сервисах.",
  };

  // Обработка изменения инпута
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  // Обработка раскрытия/скрытия блока
  function toggleExpanded() {
    setIsExpanded(prev => !prev);
  }

  // Обработка загрузки файла
  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      // Проверка типа файла
      if (!file.type.startsWith("image/")) {
        alert("Пожалуйста, загрузите изображение");
        return;
      }

      // Проверка размера файла (максимум 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Файл слишком большой. Максимальный размер: 5MB");
        return;
      }

      setSelectedFile(file);
      setIsAvatarChanged(true);

      // Создание превью
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  // Обработка нажатия кнопки "Изменить"
  function handleChangeAvatar() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = handleFileUpload;
    input.click();
  }

  // Обработка нажатия кнопки "Сохранить"
  async function handleSaveAvatar() {
    if (!selectedFile || !isAvatarChanged) return;

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      setLoading(true);
      const response = await api.uploadAvatar(formData);
      if (response.ok) {
        // Обновление аватарки после успешной загрузки
        const data = await response.json();
        setAvatarPreview(data.avatarUrl);
        setIsAvatarChanged(false);
      }
    } catch (error) {
      console.error("Ошибка при загрузке аватарки:", error);
      alert("Произошла ошибка при загрузке аватарки");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={styles.profile__top}>
        <ArrowBtns />
        <h3 className={styles["profile__page-title"]}>Профиль</h3>
      </div>
      <div className={styles.profile__btns}>
        <div className={styles["profile__btns-left"]}>
          <LinkUnder path="/profile/profile-settings/1" label="Профиль" />
          <LinkUnder path="/profile/card-settings/1" label="Карточка" />
        </div>
        <div className={styles["profile__btns-right"]}>
          <MenuBtn label="Отмена" />
          <MenuBtn
            label="Сохранить"
            disabled={!isAvatarChanged}
            onClick={handleSaveAvatar}
          />
        </div>
      </div>
      <div className={styles.profile__avatar}>
        <div className={styles.top__block}>
          <h4 className={styles["profile__title"]}>
            {isProfile ? "Фото профиля" : "Баннер"}
          </h4>
          <Tooltip content={tooltips[isProfile ? "avatar" : "banner"]}>
            <button className={styles["profile__question-btn"]}>
              <QuestionIcon />
            </button>
          </Tooltip>
        </div>
        <div className={styles.avatar__bottom}>
          <div className={styles.profile__block}>
            <img
              src={avatarPreview}
              alt={isProfile ? "Ваша аватарка" : "Баннер вашей страницы"}
              className={styles.profile__image}
            />
          </div>
          <div className={styles["profile__avatar-btns"]}>
            <MenuBtn label="Изменить" onClick={handleChangeAvatar} />
            <MenuBtn label="Удалить" danger={true} />
          </div>
        </div>
      </div>
      <div className={styles["profile__settings-block"]}>
        <div className={styles.top__block}>
          <h4 className={styles["profile__title"]}>
            {isProfile ? "Имя пользователя" : "О себе"}
          </h4>
          <Tooltip content={tooltips[isProfile ? "username" : "about"]}>
            <button className={styles["profile__question-btn"]}>
              <QuestionIcon />
            </button>
          </Tooltip>
        </div>
        <Input
          placeholder={isProfile ? "Имя пользователя" : "Информация о Вас"}
          value={isProfile ? username : ""}
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

export default SettingsProfile;
