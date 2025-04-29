import loginImage from "../../assets/images/login.jpg";
import MenuBtn from "@/components/MenuBtn/MenuBtn.jsx";
import MenuLink from "@/components/MenuLink/MenuLink.jsx";
import Section from "@/components/Section/Section.jsx";
import styles from "./MusicianPage.module.scss";

function MusiciansPage({ songs }) {
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
                src={loginImage}
                alt="Аватарка"
              />
            </div>
            <div className={styles["header__bottom-info"]}>
              <h2 className={styles["header__bottom-title"]}>Александр</h2>
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
            Благодарим вас за проявленный интерес к нашей компании и добро
            пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что
            из того, что я наряжал, и кое-что из того, что я хотел сделать. У
            нас тут очень весело, очень-очень прикольно. Общение максимально…
          </p>
        </div>
      </section>
      <div className={styles.wrapper}>
        <Section
          title="Популярные треки"
          link="#"
          songs={songs}
          isChart="true"
        />
      </div>
      <div className={styles.wrapper}>
        <Section title="Альбомы" link="#" songs={songs} />
      </div>
    </>
  );
}

export default MusiciansPage;
