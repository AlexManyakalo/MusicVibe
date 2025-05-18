import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api";
// Components
import { Loader } from "@/components/index.js";
import MediaDetails from "@/components/MediaDetails/MediaDetails";

function TrackPage() {
  // ЗАПРОСЫ
  const { id } = useParams();
  const [track, setTrack] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [trackRes, commentsRes] = await Promise.all([
          api.get(`/track/${id}`),
          api.get(`/comments/track/${id}`),
        ]);
        setTrack(trackRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  async function handleCommentSubmit(text) {
    try {
      const response = await api.post(`/comments/track/${id}`, { text });
      setComments(prev => [...prev, response.data]);
    } catch (err) {
      console.error("Ошибка при отправке комментария:", err);
    }
  }

  // ЛОАДЕР
  if (loading) return <Loader />;

  // Если альбом не найден
  if (!track) return <div>Трек не найден</div>;

  return (
    <MediaDetails
      track={track}
      comments={comments}
      onCommentSubmit={handleCommentSubmit}
    />
  );
}

export default TrackPage;
