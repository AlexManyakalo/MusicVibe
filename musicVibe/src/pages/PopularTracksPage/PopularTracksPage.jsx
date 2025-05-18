import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api";
// Components
import { Loader, TrackList } from "@/components/index.js";

// TODO:
// На этой странице запрос должен быть на все необходимые треки
// Например, все 50 треков музыканта расположенных в порядке популярности (всего 1 запрос)

function PopularTracksPage() {
  const { id } = useParams(); // Получаем ID музыканта из URL
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await api.get(`/musician/${id}/popular-tracks`);
        setTracks(res.data);
      } catch (err) {
        console.error("Ошибка при получении треков:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  if (loading) return <Loader />;

  return (
    <>
      <h2 className="page__title">Популярные треки</h2>
      <TrackList tracks={tracks} isChart="true" />
    </>
  );
}

export default PopularTracksPage;
