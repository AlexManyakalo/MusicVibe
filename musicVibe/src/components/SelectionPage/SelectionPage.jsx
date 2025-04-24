import { useState } from "react";
import Button from "../Button/Button";
import loginImage from "../../assets/images/login.jpg";

import styles from "./SelectionPage.module.scss";

function SelectionPage({ title, items, onNextClick }) {
  const [selected, setSelected] = useState([]);

  const handleItemClick = id => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  return (
    <div className="container">
      <section className={styles.selection}>
        <div className={styles.selection__left}>
          <div className={styles["selection__left-top"]}>
            <h2 className={styles["selection__left-title"]}>{title}</h2>
            <p className={styles["selection__left-paragraph"]}>
              Это поможет получать более точные и интересные рекомендации
            </p>
          </div>
          <div className={styles["selection__left-bottom"]}>
            <Button
              text="Далее"
              selected={selected.length > 0}
              onClick={() => onNextClick(selected)}
            />
          </div>
        </div>
        <div className={styles.selection__right}>
          <ul
            className={styles["selection__right-list"]}
          >
            {items.map((item, index) => (
              <li key={item.id} className={styles["selection__right-item"]}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`${styles.item__btn} ${
                    selected.includes(item.id) ? styles.active : ""
                  }`}
                >
                  <div
                    className={styles["item__block-image"]}
                  >
                    <img
                      className={styles.block__image}
                      src={loginImage}
                      alt={item.name}
                    />
                  </div>
                  <span className={styles.item__paragraph}>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default SelectionPage;
