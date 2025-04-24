import MusicCard from "@/components/MusicCard/MusicCard.jsx";
import ChartItem from "@/components/ChartItem/ChartItem.jsx";
import styles from "./Section.module.scss";

function Section({ title, link, songs }) {
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
      <ul
        className={title === "Чарт" ? styles.chart__list : styles.section__list}
      >
        {songs.map((song, index) =>
          title === "Чарт" ? (
            <ChartItem key={song.id} index={index}>
              {song.image}
            </ChartItem>
          ) : (
            <MusicCard key={song.id}>{song.image}</MusicCard>
          ),
        )}
      </ul>
    </section>
  );
}

export default Section;
