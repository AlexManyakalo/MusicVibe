import MusicCard from "@/components/MusicCard/MusicCard.jsx";
import ChartItem from "@/components/ChartItem/ChartItem.jsx";
import styles from "./Section.module.scss";

function Section({ title, link, songs, isChart = false }) {
  return (
    <section className={styles.section}>
      <div className={styles.section__top}>
        <h2 className={styles.section__title}>
          <a href={link}>{title}</a>
        </h2>
        <a className={styles.section__link} href={link}>
          Показать все
        </a>
      </div>
      <ul className={isChart ? styles.chart__list : styles.section__list}>
        {songs.map((song, index) =>
          isChart ? (
            <ChartItem key={song.id} index={index} image={song.image} />
          ) : (
            <MusicCard key={song.id}>{song.image}</MusicCard>
          ),
        )}
      </ul>
    </section>
  );
}

export default Section;
