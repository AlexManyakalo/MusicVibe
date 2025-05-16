import { useEffect, useState } from "react";
import api from "@/api";
// Components
import { Loader, TrackList } from "@/components/index.js";

// TODO:
// На этой странице запрос должен быть на все необходимые альбомы
// Например, все 100 альбомов рекомендаций (всего 1 запрос)

function RecommendAlbumPage() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const res = await api.get("/albums/recommended"); // TODO: изменить на запрос к трекам рекомендаций ()
        setAlbums(res.data);
      } catch (err) {
        console.error("Ошибка при получении альбомов:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAlbums();
  }, []);

  if (loading) return <Loader />;

  return <TrackList albums={albums} />;
}

export default RecommendAlbumPage;
