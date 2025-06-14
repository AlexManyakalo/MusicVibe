// Components
import { ArrowBtns, ChartItem, MusicCard } from "@/components/index.js";
// Styles
import styles from "./TrackList.module.scss";

function TrackList({ tracks = [], albums = [], isChart = false }) {
  const items = albums.length > 0 ? albums : tracks;
  const isAlbum = albums.length > 0;

  return (
    <>
      <ArrowBtns />
      <ul className={isChart ? styles.chart__list : styles.section__list}>
        {items.map((item, index) =>
          isChart ? (
            <ChartItem
              key={item.id}
              index={index}
              track={item}
              tracks={tracks}
            />
          ) : (
            <MusicCard
              key={item.id}
              item={item}
              isAlbum={isAlbum}
              tracks={tracks}
            />
          ),
        )}
      </ul>
    </>
  );
}

export default TrackList;
