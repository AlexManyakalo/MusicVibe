import { useEffect, useState } from "react";
import api from "@/api";
// Components
import { Loader, TrackList } from "@/components/index.js";

// TODO:
// На этой странице запрос должен быть на все необходимые треки
// Например, все 30 альбомов музыканта (всего 1 запрос)

function AlbumsPage() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const res = await api.get("/albums"); // TODO: изменить на запрос к альбомам рекомендованным ()
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

export default AlbumsPage;
