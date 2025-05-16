// Components
import { ArrowBtns, ChartItem, MusicCard } from "@/components/index.js";
// Styles
import styles from "./TrackList.module.scss";

function TrackList({ tracks, isChart = false }) {
  return (
    <>
      <ArrowBtns />
      <ul className={isChart ? styles.chart__list : styles.section__list}>
        {tracks.map((track, index) =>
          isChart ? (
            <ChartItem key={track.id} index={index} track={track} />
          ) : (
            <MusicCard key={track.id} item={track} isAlbum={false} />
          ),
        )}
      </ul>
    </>
  );
}

export default TrackList;
