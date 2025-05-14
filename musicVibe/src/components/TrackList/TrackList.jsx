import { useEffect, useState } from "react";
import api from "@/api";
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
            <MusicCard key={track.id} track={track} />
          ),
        )}
      </ul>
    </>
  );
}

export default TrackList;
