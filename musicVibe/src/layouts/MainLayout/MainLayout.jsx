import { useState, useRef, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import loginImage from "@/assets/images/login.jpg";
import LayoutNavBtn from "@/components/LayoutNavBtn/LayoutNavBtn.jsx";
import Player from "@/components/Player/Player.jsx";

import {
  SearchIcon,
  HomeIcon,
  NoteIcon,
  UsersIcon,
  SettingsIcon,
  HeadphonesIcon,
  CardBankIcon,
  MoonIcon,
  CircleHelpIcon,
  ExitIcon,
} from "@/components/Icons/icons.jsx";

import styles from "./MainLayout.module.scss";

function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className={styles.layout}>
      <aside className={styles.layout__aside}>
        <div className={styles["layout__inner-nav"]}>
          <nav className={styles.aside__nav}>
            <h1 className={styles["aside__nav-title"]}>
              <Link to={"/home"}>MusicVibe</Link>
            </h1>
            <ul className={styles["aside__nav-list"]}>
              <LayoutNavBtn
                path="/search"
                icon={<SearchIcon />}
                label="Поиск"
              />
              <LayoutNavBtn path="/home" icon={<HomeIcon />} label="Главная" />
              <LayoutNavBtn
                path="/my-music"
                icon={<NoteIcon />}
                label="Моя музыка"
              />
              <LayoutNavBtn
                path="/community"
                icon={<UsersIcon />}
                label="Сообщество"
              />
            </ul>
            <div
              ref={menuRef}
              className={`${styles.menu} ${isMenuOpen ? styles.open__menu : ""}`}
            >
              <ul className={styles.menu__list}>
                <div className={styles.wrapper__btn}>
                  <LayoutNavBtn icon={<SettingsIcon />} label="Профиль" />
                  <LayoutNavBtn icon={<HeadphonesIcon />} label="Студия" />
                  <LayoutNavBtn icon={<CardBankIcon />} label="Подписка" />
                  <LayoutNavBtn icon={<MoonIcon />} label="Тема" />
                  <LayoutNavBtn icon={<CircleHelpIcon />} label="Поддержка" />
                </div>
                <LayoutNavBtn
                  icon={<ExitIcon />}
                  label="Выйти"
                  className={styles.exit__btn}
                />
              </ul>
            </div>
          </nav>
          <button
            ref={buttonRef}
            className={styles.aside__btn}
            onClick={toggleMenu}
          >
            <div className={styles["btn__image-block"]}>
              <img
                className={styles.btn__image}
                src={loginImage}
                alt="Аватар пользователя"
              />
            </div>
            <p className={styles.btn__paragraph}>Александр</p>
          </button>
        </div>
      </aside>
      <main className={styles.content}>
        <Outlet />
        <Player />
      </main>
    </div>
  );
}

export default MainLayout;
