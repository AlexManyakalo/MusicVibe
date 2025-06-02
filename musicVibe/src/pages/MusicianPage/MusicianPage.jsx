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
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [musicianRes, popularTracksRes] = await Promise.all([
          api.get(`/musician/${id}`),
          api.get(`/musician/${id}/popular-tracks`),
        ]);
        setMusician(musicianRes.data);
        setTracks(popularTracksRes.data);
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
          {console.log(musician.backgroundUrl)}
          {musician.backgroundUrl ? <img
            className={styles["header__top-image"]}
            src={musician.backgroundUrl}
            alt={`Баннер ${musician.name}`}
          /> : <div className={styles["header__top-block"]}></div>}
          
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
                src={musician.avatarUrl || "/avatarUser/defaultAvatar.png"}
                alt={`Аватарка ${musician.name}`}
              />
            </Link>
            <div className={styles["header__bottom-info"]}>
              <h2 className={styles["header__bottom-title"]}>
                {musician.name}
              </h2>
              <p className={styles["header__bottom-paragraph"]}>
                {musician.auditions} в месяц
              </p>
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
            {musician.socialLinks?.map(link => (
              <li key={link.name} className={styles["info__left-item"]}>
                <MenuLink label={link.name} path={link.url} />
              </li>
            ))}
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
        <Section
          title="Альбомы"
          link={`/albums/${musician.id}`}
          albums={musician.albums || []}
        />
      </div>
    </>
  );
}

export default MusicianPage;
