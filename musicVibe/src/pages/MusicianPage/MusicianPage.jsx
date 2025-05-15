import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "@/api";
// Components
import {
  ArrowBtns,
  MenuBtn,
  MenuLink,
  Section,
  Loader,
} from "@/components/index.js";
// Icons
import { EditIcon } from "@/components/Icons/icons.jsx";
// Styles
import styles from "./MusicianPage.module.scss";

function MusicianPage() {
  // ЗАПРОСЫ
  const { id } = useParams();
  const [musician, setMusician] = useState({});
  const [tracks, setTracks] = useState([]); // Должна быть выборка только песен этого автора
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [musicianRes, tracksRes] = await Promise.all([
          api.get(`/musician/${id}`),
          api.get("/tracks"),
        ]);
        setMusician(musicianRes.data);
        setTracks(tracksRes.data);
      } catch (err) {
        console.error("Данные музыканта не найдены:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  // ЛОАДЕР
  if (loading) return <Loader />;

  return (
    <>
      <ArrowBtns />
      <header className={styles.header}>
        <div className={styles.header__top}>
          <img
            className={styles["header__top-image"]}
            src={musician.backgroundUrl}
            alt={`Баннер ${musician.name}`}
          />
        </div>
        <div className={styles.header__bottom}>
          <div className={styles["header__bottom-left"]}>
            <Link
              to="/profile/profile-settings/1"
              className={styles["header__bottom-block"]}
            >
              <EditIcon className={styles["bottom__block-edit"]} />
              <img
                className={styles["bottom__block-image"]}
                src={musician.imageUrl}
                alt={`Аватарка ${musician.name}`}
              />
            </Link>
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
          link={`/popular-tracks/${musician.id}`}
          tracks={tracks}
          isChart="true"
        />
      </div>
      <div className={styles.wrapper}>
        <Section title="Альбомы" link={`/albums/${musician.id}`} tracks={tracks} />
      </div>
    </>
  );
}

export default MusicianPage;
