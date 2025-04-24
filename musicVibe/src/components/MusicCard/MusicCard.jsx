import styles from "./MusicCard.module.scss";

function MusicCard({ children }) {
  return (
    <li className={styles.item}>
      <a className={styles["item__block-link"]} href="#">
        <img
          className={styles.block__image}
          src={children}
          alt="Название песни"
        />
        <div className={styles.link__controls}>
          <button className={styles.controls__play}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_60_217)">
                <path
                  d="M1.5 24C1.5 36.4265 11.5736 46.5 24 46.5C36.4265 46.5 46.5 36.4265 46.5 24C46.5 11.5736 36.4265 1.5 24 1.5C11.5736 1.5 1.5 11.5736 1.5 24Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 31.5V16.5L31.5 24L19 31.5Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_60_217">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <button className={styles.controls__like}>
            <svg
              width="32"
              height="30"
              viewBox="0 0 32 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_61_230)">
                <path
                  d="M16 6.82383C12.6667 -1.00022 1 -0.166889 1 9.83316C1 19.8331 16 28.1668 16 28.1668C16 28.1668 31 19.8331 31 9.83316C31 -0.166889 19.3333 -1.00022 16 6.82383Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_61_230">
                  <rect width="32" height="30" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </a>
      <div className={styles.item__text}>
        <h3 className={styles.item__title}>
          <a href="#">Название песни</a>
        </h3>
        <a className={styles.item__link} href="#">
          Артист
        </a>
      </div>
    </li>
  );
}

export default MusicCard;
