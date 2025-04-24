import { useState, useRef, useEffect } from "react";
import loginImage from "@/assets/images/login.jpg";
import styles from "./MainLayout.module.scss";

const MainLayout = ({ children }) => {
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
              <a href="#">MusicVibe</a>
            </h1>
            <ul className={styles["aside__nav-list"]}>
              <li className={styles["aside__nav-item"]}>
                <a href="#" className={styles["aside__nav-link"]}>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.7137 17.7137C14.2741 18.8333 12.4649 19.5 10.5 19.5C5.80558 19.5 2 15.6944 2 11C2 6.30558 5.80558 2.5 10.5 2.5C15.1944 2.5 19 6.30558 19 11C19 12.9649 18.3333 14.7741 17.2137 16.2137L21.25 20.25C21.6642 20.6642 21.6642 21.3358 21.25 21.75C20.8358 22.1642 20.1642 22.1642 19.75 21.75L15.7137 17.7137ZM17 11C17 14.5899 14.0899 17.5 10.5 17.5C6.91015 17.5 4 14.5899 4 11C4 7.41015 6.91015 4.5 10.5 4.5C14.0899 4.5 17 7.41015 17 11Z"
                      fill="#7E7E7E"
                    />
                  </svg>
                  <p>Поиск</p>
                </a>
              </li>
              <li className={styles["aside__nav-item"]}>
                <a href="#" className={styles["aside__nav-link"]}>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.6585 10.2012L12.6585 4.07622C12.2815 3.74632 11.7185 3.74632 11.3415 4.07622L4.3415 10.2012C4.12448 10.3911 4 10.6654 4 10.9538V19.5C4 20.0523 4.44772 20.5 5 20.5H9C9.55228 20.5 10 20.0523 10 19.5V15.5C10 14.9477 10.4477 14.5 11 14.5H13C13.5523 14.5 14 14.9477 14 15.5V19.5C14 20.0523 14.4477 20.5 15 20.5H19C19.5523 20.5 20 20.0523 20 19.5V10.9538C20 10.6654 19.8755 10.3911 19.6585 10.2012Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>Главная</p>
                </a>
              </li>
              <li className={styles["aside__nav-item"]}>
                <a href="#" className={styles["aside__nav-link"]}>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.5 21.5C10.433 21.5 12 19.933 12 18C12 16.067 10.433 14.5 8.5 14.5C6.567 14.5 5 16.067 5 18C5 19.933 6.567 21.5 8.5 21.5Z"
                      stroke="#7E7E7E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 18.5V3.5"
                      stroke="#7E7E7E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 3.5L18 4.5V8.5L12 7.5V3.5Z"
                      stroke="#7E7E7E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>Моя музыка</p>
                </a>
              </li>
              <li className={styles["aside__nav-item"]}>
                <a href="#" className={styles["aside__nav-link"]}>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        d="M17 21.5V19.5C17 18.4391 16.5786 17.4217 15.8284 16.6716C15.0783 15.9214 14.0609 15.5 13 15.5H5C3.93913 15.5 2.92172 15.9214 2.17157 16.6716C1.42143 17.4217 1 18.4391 1 19.5V21.5"
                        stroke="#7E7E7E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 11.5C11.2091 11.5 13 9.70914 13 7.5C13 5.29086 11.2091 3.5 9 3.5C6.79086 3.5 5 5.29086 5 7.5C5 9.70914 6.79086 11.5 9 11.5Z"
                        stroke="#7E7E7E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23 21.5V19.5C22.9993 18.6137 22.7044 17.7528 22.1614 17.0523C21.6184 16.3519 20.8581 15.8516 20 15.63"
                        stroke="#7E7E7E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 3.63C16.8604 3.85031 17.623 4.35071 18.1676 5.05232C18.7122 5.75392 19.0078 6.61683 19.0078 7.505C19.0078 8.39318 18.7122 9.25608 18.1676 9.95769C17.623 10.6593 16.8604 11.1597 16 11.38"
                        stroke="#7E7E7E"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                  <p>Сообщество</p>
                </a>
              </li>
            </ul>
            <div
              ref={menuRef}
              className={`${styles.menu} ${isMenuOpen ? styles.open__menu : ""}`}
            >
              <ul className={styles.menu__list}>
                <li className={styles["aside__nav-item"]}>
                  <a href="#" className={styles["aside__nav-link"]}>
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.6006 21.5761L19.0608 18.4236C19.6437 18.0871 19.9346 17.9188 20.1465 17.6834C20.3341 17.4751 20.4759 17.2297 20.5625 16.9632C20.6602 16.6626 20.6602 16.3267 20.6602 15.6568V9.34268C20.6602 8.67277 20.6602 8.33694 20.5625 8.03638C20.4759 7.76982 20.3341 7.52428 20.1465 7.316C19.9355 7.08161 19.6453 6.91405 19.0674 6.58043L13.5996 3.42359C13.0167 3.08706 12.7259 2.91913 12.416 2.85328C12.1419 2.795 11.8584 2.795 11.5843 2.85328C11.2744 2.91914 10.9826 3.08706 10.3997 3.42359L4.93843 6.57666C4.35623 6.91279 4.06535 7.08073 3.85352 7.316C3.66597 7.52428 3.52434 7.76982 3.43773 8.03638C3.33984 8.33765 3.33984 8.67436 3.33984 9.34742V15.6524C3.33984 16.3254 3.33984 16.6619 3.43773 16.9632C3.52434 17.2297 3.66597 17.4751 3.85352 17.6834C4.06548 17.9188 4.35657 18.0871 4.93945 18.4236L10.3997 21.5761C10.9826 21.9126 11.2744 22.0806 11.5843 22.1465C11.8584 22.2047 12.1419 22.2047 12.416 22.1465C12.7259 22.0806 13.0177 21.9126 13.6006 21.5761Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 12.4998C9 14.1566 10.3431 15.4998 12 15.4998C13.6569 15.4998 15 14.1566 15 12.4998C15 10.8429 13.6569 9.49976 12 9.49976C10.3431 9.49976 9 10.8429 9 12.4998Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p>Профиль</p>
                  </a>
                </li>
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
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default MainLayout;
