import { Link } from "react-router-dom";
// Components
import { MusicCard, ChartItem } from "@/components/index.js";
// Styles
import styles from "./Section.module.scss";

function Section({ title, link, tracks = [], albums = [], isChart = false }) {
  const items = albums.length > 0 ? albums : tracks;
  const isAlbum = albums.length > 0;

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
        {items.map((item, index) =>
          isChart ? (
            <ChartItem key={item.id} index={index} track={item} />
          ) : (
            <MusicCard key={item.id} item={item} isAlbum={isAlbum} />
          ),
        )}
      </ul>
    </section>
  );
}

export default Section;
