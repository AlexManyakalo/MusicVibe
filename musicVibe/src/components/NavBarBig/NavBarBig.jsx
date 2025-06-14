import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// Components
import { LayoutNavBtn } from "@/components/index.js";
import { useAuth } from "@/context/AuthContext";
import { ExitIcon } from "@/components/index.js";
// Styles
import styles from "./NavBarBig.module.scss";

function NavBarBig({
  mainNavItems = [],
  menuNavItems = [],
  logoText = "MusicVibe",
  logoPath = "/home",
  className,
  children,
}) {
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
    <div className={`${styles.layout} ${className || ""}`}>
      <aside className={styles.layout__aside}>
        <div className={styles["layout__inner-nav"]}>
          <nav className={styles.aside__nav}>
            <h1 className={styles["aside__nav-title"]}>
              <Link to={logoPath}>{logoText}</Link>
            </h1>
            <ul className={styles["aside__nav-list"]}>
              {mainNavItems.map((item, index) => (
                <LayoutNavBtn
                  key={index}
                  path={item.path}
                  icon={item.icon}
                  label={item.label}
                  onMenuClick={item.onMenuClick}
                />
              ))}
            </ul>
            <div
              ref={menuRef}
              className={`${styles.menu} ${isMenuOpen ? styles.open__menu : ""}`}
            >
              <ul className={styles.menu__list}>
                <div className={styles.wrapper__btn}>
                  {menuNavItems.map((item, index) => (
                    <LayoutNavBtn
                      key={index}
                      path={item.path}
                      icon={item.icon}
                      label={item.label}
                      onMenuClick={item.onMenuClick || handleMenuClick}
                    />
                  ))}
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
      <main className={styles.content}>{children}</main>
    </div>
  );
}

export default NavBarBig;
