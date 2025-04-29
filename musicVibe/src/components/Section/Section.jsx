import { Link } from "react-router-dom";
import MusicCard from "@/components/MusicCard/MusicCard.jsx";
import ChartItem from "@/components/ChartItem/ChartItem.jsx";

import styles from "./Section.module.scss";

function Section({ title, link, tracks, isChart = false }) {
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
            <MusicCard key={track.id} track={track}></MusicCard>
          ),
        )}
      </ul>
    </section>
  );
}

export default Section;
