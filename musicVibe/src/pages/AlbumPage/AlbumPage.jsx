import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api";
// Components
import { Loader } from "@/components/index.js";
import MediaDetails from "@/components/MediaDetails/MediaDetails";

function AlbumPage() {
  // ЗАПРОСЫ
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [albumTracks, setAlbumTracks] = useState([]);
  // const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Получаем все необходимые данные параллельно
        // const [albumRes, tracksRes, commentsRes] = await Promise.all([
        const [albumRes, tracksRes] = await Promise.all([
          api.get(`/album/${id}`),
          api.get(`/album/${id}/tracks`),
          // api.get(`/comments/album/${id}`),
        ]);

        setAlbum(albumRes.data);
        setAlbumTracks(tracksRes.data);
        // setComments(commentsRes.data);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  // async function handleCommentSubmit(text) {
  //   try {
  //     const response = await api.post(`/comments/album/${id}`, { text });
  //     setComments(prev => [...prev, response.data]);
  //   } catch (err) {
  //     console.error("Ошибка при отправке комментария:", err);
  //   }
  // }

  // ЛОАДЕР
  if (loading) return <Loader />;

  // Если альбом не найден
  if (!album) return <div>Альбом не найден</div>;

  return (
    <MediaDetails
      album={albumTracks}
      albumInfo={album}
    />
  );
}

export default AlbumPage;
