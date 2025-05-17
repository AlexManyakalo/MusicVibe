import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "@/context/PlayerContext";
import { Link, useParams } from "react-router-dom";
import api from "@/api";
// Components
import {
  ArrowBtns,
  MenuBtn,
  MenuBtnMusic,
  Input,
  ChartItem,
  Loader,
} from "@/components/index.js";
import { HeartIcon } from "@/components/index.js";
import LoginImage from "@/assets/images/login.jpg";

// TODO: Здесь нужен запрос к АПИ (наверное у каждой страницы будет отдельный запрос к АПИ)

function AlbumPage() {
  // ЗАПРОСЫ
  const { id } = useParams();
  const [track, setTrack] = useState({});
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [trackRes, tracksRes] = await Promise.all([
          api.get(`/track/${id}`),
          api.get("/tracks"),
        ]);
        setTrack(trackRes.data);
        setTracks(tracksRes.data);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  // ПЛЕЕР
  const { playTrack, togglePlayPause, currentTrack, isPlaying } =
    useContext(PlayerContext);
  const isCurrent = currentTrack?.id === track.id;

  function handlePlay(e) {
    e.preventDefault(); // предотвращаем переход по ссылке

    if (isCurrent) togglePlayPause();
    else playTrack(track);
  }

  // Обработка изменения комментария
  const handleCommentChange = e => {
    setComment(e.target.value);
  };

  // ЛОАДЕР
  if (loading) return <Loader />;

  return (
    <>
      <MediaDetails />
    </>
  );
}

export default AlbumPage;
