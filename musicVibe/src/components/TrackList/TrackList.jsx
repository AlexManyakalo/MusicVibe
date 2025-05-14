import { useEffect, useState } from "react";
import api from "@/api";
// Components
import { ArrowBtns, ChartItem, MusicCard, Loader } from "@/components/index.js";
// Styles
import styles from "./TrackList.module.scss";

function TrackList() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) return <Loader />;

  return <h4>Страница Поддержки</h4>;
}

export default TrackList;
