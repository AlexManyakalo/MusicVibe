import { useState } from "react";
// Components
import { Button } from "@/components/index.js";
// Styles
import styles from "./SelectionPage.module.scss";

function SelectionPage({ title, items, onNextClick, type = "genre" }) {
  const [selected, setSelected] = useState([]);

  const handleItemClick = id => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const getGenreGradient = id => {
    const gradients = [
      "linear-gradient(45deg, #FF6B6B, #4ECDC4, #FF6B6B)",
      "linear-gradient(45deg, #A8E6CF, #FFD3B6, #A8E6CF)",
      "linear-gradient(45deg, #FF8B94, #FFD93D, #FF8B94)",
      "linear-gradient(45deg, #6C5CE7, #A8E6CF, #6C5CE7)",
      "linear-gradient(45deg, #FFD93D, #FF6B6B, #FFD93D)",
      "linear-gradient(45deg, #4ECDC4, #6C5CE7, #4ECDC4)",
      "linear-gradient(45deg, #FFD3B6, #FF8B94, #FFD3B6)",
      "linear-gradient(45deg, #A8E6CF, #6C5CE7, #A8E6CF)",
      "linear-gradient(45deg, #FF6B6B, #FFD93D, #FF6B6B)",
      "linear-gradient(45deg, #6C5CE7, #FF8B94, #6C5CE7)",
    ];
    return gradients[id % gradients.length];
  };

  return (
    <div className="container">
      <section className={styles.selection}>
        <div className={styles.selection__left}>
          <div className={styles["selection__left-top"]}>
            <h2 className={styles["selection__left-title"]}>{title}</h2>
            <p className={styles["selection__left-paragraph"]}>
              {type === "genre"
                ? "Это поможет получать более точные и интересные рекомендации"
                : "Выберите музыкантов, чье творчество вам интересно"}
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
          <ul className={styles["selection__right-list"]}>
            {items.map(item => (
              <li key={item.id} className={styles["selection__right-item"]}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`${styles.item__btn} ${
                    selected.includes(item.id) ? styles.active : ""
                  }`}
                >
                  <div className={styles["item__block-image"]}>
                    {type === "musician" ? (
                      <img
                        className={styles.block__image}
                        src={item.avatarUrl}
                        alt={item.name}
                      />
                    ) : (
                      <div
                        className={styles.block__gradient}
                        style={{
                          background: getGenreGradient(item.id),
                          backgroundSize: "200% 200%",
                        }}
                      />
                    )}
                  </div>
                  <span className={styles.item__paragraph}>
                    {item.name}
                  </span>
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
