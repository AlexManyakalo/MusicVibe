import { useEffect, useState } from "react";
import api from "@/api";
// Components
import { Loader, TrackList } from "@/components/index.js";

// TODO:
// На этой странице запрос должен быть на все необходимые треки
// Например, все 50 новых треков (всего 1 запрос)

function NewPage() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await api.get("/tracks/new"); // TODO: изменить на запрос к трекам отслеживаемых ()
        setTracks(res.data);
      } catch (err) {
        console.error("Ошибка при получении треков:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, []);

  if (loading) return <Loader />;

  return <TrackList tracks={tracks} />;
}

export default NewPage;
