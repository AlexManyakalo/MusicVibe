import { useState, useRef, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
// Components
import { LayoutNavBtn, Player } from "@/components/index.js";
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
} from "@/components/index.js";
import { useAuth } from "@/context/AuthContext";
// Styles
import styles from "./MainLayout.module.scss";

function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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
                  <LayoutNavBtn
                    path={`/profile/profile-settings/${user?.id}`}
                    icon={<SettingsIcon />}
                    label="Профиль"
                    onMenuClick={handleMenuClick}
                  />
                  <LayoutNavBtn
                    path={`/studio/${user?.id}`}
                    icon={<HeadphonesIcon />}
                    label="Студия"
                    onMenuClick={handleMenuClick}
                  />
                  <LayoutNavBtn
                    path={`/subscribe/${user?.id}`}
                    icon={<CardBankIcon />}
                    label="Подписка"
                    onMenuClick={handleMenuClick}
                  />
                  <LayoutNavBtn path="/" icon={<MoonIcon />} label="Тема" />
                  <LayoutNavBtn
                    path="/support/1"
                    icon={<CircleHelpIcon />}
                    label="Поддержка"
                    onMenuClick={handleMenuClick}
                  />
                </div>
                <LayoutNavBtn
                  path="/"
                  icon={<ExitIcon />}
                  label="Выйти"
                  className={styles.exit__btn}
                  onMenuClick={handleLogout}
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
                src={user?.avatarUrl || "/avatarUser/defaultAvatar.png"}
                alt={`Аватар ${user?.username || "пользователя"}`}
              />
            </div>
            <p className={styles.btn__paragraph}>{user?.username}</p>
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
