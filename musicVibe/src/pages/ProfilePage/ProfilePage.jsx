import { useEffect, useState } from "react";
import api from "@/api";
// Components
import ArrowBtns from "@/components/ArrowBtns/ArrowBtns.jsx";
import MenuBtn from "@/components/MenuBtn/MenuBtn.jsx";
import LinkUnder from "@/components/LinkUnder/LinkUnder.jsx";
import Input from "@/components/Input/Input";
import Loader from "@/components/Loader/Loader.jsx";
import { QuestionIcon, ArrowUpIcon } from "@/components/Icons/icons.jsx";
// Styles
import styles from "./ProfilePage.module.scss";
import LoginImage from "@/assets/images/login.jpg";

function ProfilePage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

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
          <button className={styles["profile__question-btn"]}>
            <QuestionIcon />
          </button>
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
          <button className={styles["profile__question-btn"]}>
            <QuestionIcon />
          </button>
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
          <button className={styles["profile__question-btn"]}>
            <QuestionIcon />
          </button>
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
          <button className={styles["profile__question-btn"]}>
            <QuestionIcon />
          </button>
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
          <button className={styles["profile__add-btn"]}>
            <ArrowUpIcon />
            <h4 className={styles["profile__title"]}>Дополнитель</h4>
          </button>
          <button className={styles["profile__question-btn"]}>
            <QuestionIcon />
          </button>
        </div>
        <MenuBtn label="Выйти из аккаунта" danger={true} />
        <MenuBtn label="Удалить аккаунт" danger={true} />
      </div>
    </>
  );
}

export default ProfilePage;