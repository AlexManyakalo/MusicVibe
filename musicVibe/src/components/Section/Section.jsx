import { Link } from "react-router-dom";
// Components
import { MusicCard, ChartItem } from "@/components/index.js";
// Styles
import styles from "./Section.module.scss";

function Section({ title, link, tracks, isChart = false, isAlbum = false }) {
  return (
    <section className={styles.section}>
      <div className={styles.section__top}>
        <h2 className={styles.section__title}>
          <Link to={link}>{title}</Link>
        </h2>
        <Link className={styles.section__link} to={link}>
          Показать все
        </Link>
      </div>
      <ul className={isChart ? styles.chart__list : styles.section__list}>
        {tracks.map((track, index) =>
          isChart ? (
            <ChartItem key={track.id} index={index} track={track} />
          ) : (
            <MusicCard key={track.id} track={track} isAlbum={isAlbum} />
          ),
        )}
      </ul>
    </section>
  );
}

export default Section;
