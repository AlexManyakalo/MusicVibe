import styles from "./ChartItem.module.scss";

function ChartItem({ index, children }) {
  function handlePlay() {
    console.log(`Play`);
  }
  function handleLike() {
    console.log(`Like`);
  }

  return (
    <li className={styles.chart__item} onClick={handlePlay}>
      <div className={styles.item__left}>
        <p className={styles["item__left-num"]}>{index + 1}</p>
        <div className={styles["item__left-block"]}>
          <img src={children} alt="" className={styles.block__image} />
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
        </div>
        <div className={styles["item__left-text"]}>
          <h3 className={styles["text__title"]}>
            <a
              href="#"
              onClick={e => {
                e.stopPropagation();
              }}
            >
              Название песни
            </a>
          </h3>
          <a
            className={styles["text__link"]}
            href="#"
            onClick={e => {
              e.stopPropagation();
            }}
          >
            Артист
          </a>
        </div>
      </div>
      <div className={styles.item__right}>
        <button
          className={styles["item__right-like"]}
          onClick={e => {
            e.stopPropagation();
            handleLike();
          }}
        >
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
        <p className={styles["item__right-time"]}>02:33</p>
      </div>
    </li>
  );
}

export default ChartItem;
