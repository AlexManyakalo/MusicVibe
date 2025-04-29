import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api";

import MenuBtn from "@/components/MenuBtn/MenuBtn.jsx";
import MenuLink from "@/components/MenuLink/MenuLink.jsx";
import Section from "@/components/Section/Section.jsx";
import Loader from "@/components/Loader/Loader.jsx";

import styles from "./MusicianPage.module.scss";

function MusicianPage() {
  const { id } = useParams();
  const [musician, setMusician] = useState({});
  const [tracks, setTracks] = useState([]); // Должна быть выборка только песен этого автора
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMusician() {
      try {
        const res = await api.get(`/musician/${id}`);
        setMusician(res.data);
      } catch (err) {
        console.error("Музыкант не найден:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMusician();

    // Должна быть выборка только песен этого автора
    async function fetchTracks() {
      try {
        const res = await api.get("/tracks");
        setTracks(res.data);
      } catch (err) {
        console.error("Ошибка при получении треков:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__top}>
          <img
            className={styles["header__top-image"]}
            src="https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13"
            alt="Баннер артиста"
          />
        </div>
        <div className={styles.header__bottom}>
          <div className={styles["header__bottom-left"]}>
            <div className={styles["header__bottom-block"]}>
              <img
                className={styles["bottom__block-image"]}
                src={musician.image}
                alt="Аватарка"
              />
            </div>
            <div className={styles["header__bottom-info"]}>
              <h2 className={styles["header__bottom-title"]}>
                {musician.name}
              </h2>
              <p className={styles["header__bottom-paragraph"]}>291 в месяц</p>
            </div>
          </div>
          <div className={styles.controls}>
            <MenuBtn label="Поддержать" />
            <MenuBtn label="Отслеживать" />
          </div>
        </div>
      </header>
      <section className={styles.info}>
        <div className={styles.info__block}>
          <h3 className={styles["info__left-title"]}>Ссылки</h3>
          <ul className={styles["info__left-list"]}>
            <li className={styles["info__left-item"]}>
              <MenuLink label="Ютуб" />
            </li>
            <li className={styles["info__left-item"]}>
              <MenuLink label="Твич" />
            </li>
            <li className={styles["info__left-item"]}>
              <MenuLink label="Спотифай" />
            </li>
            <li className={styles["info__left-item"]}>
              <MenuLink label="Яндекс.Музыка" />
            </li>
            <li className={styles["info__left-item"]}>
              <MenuLink label="Яндекс.Музыка" />
            </li>
          </ul>
        </div>
        <div className={styles.info__block}>
          <h3 className={styles["info__left-title"]}>О музыканте</h3>
          <p className={styles["info__left-paragraph"]}>
            {musician.description}
          </p>
        </div>
      </section>
      <div className={styles.wrapper}>
        <Section
          title="Популярные треки"
          link="#"
          tracks={tracks}
          isChart="true"
        />
      </div>
      <div className={styles.wrapper}>
        <Section title="Альбомы" link="#" tracks={tracks} />
      </div>
    </>
  );
}

export default MusicianPage;
