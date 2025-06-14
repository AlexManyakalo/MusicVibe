import { Link } from "react-router-dom";
// Components
import { MusicCard, ChartItem, MusicianCard } from "@/components/index.js";
// Styles
import styles from "./Section.module.scss";

function Section({
  title,
  link,
  tracks = [],
  albums = [],
  musicians = [],
  isChart = false,
}) {
  const items =
    musicians.length > 0 ? musicians : albums.length > 0 ? albums : tracks;
  const isAlbum = albums.length > 0;
  const isMusician = musicians.length > 0;

  function renderItem(item, index) {
    if (isChart) {
      return (
        <ChartItem key={item.id} index={index} track={item} tracks={tracks} />
      );
    }
    if (isAlbum) {
      return (
        <MusicCard key={item.id} item={item} isAlbum={true} tracks={tracks} />
      );
    }
    if (isMusician) {
      return <MusicianCard key={item.id} musician={item} />;
    }
    return (
      <MusicCard key={item.id} item={item} isAlbum={false} tracks={tracks} />
    );
  }

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
        {items.map((item, index) => renderItem(item, index))}
      </ul>
    </section>
  );
}

export default Section;
