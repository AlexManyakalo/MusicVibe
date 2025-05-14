import { useEffect, useState } from "react";
import api from "@/api";
// Components
import { Section, Loader } from "@/components/index.js";

function HomePage() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const res = await api.get("/tracks");
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

  return (
    <>
      <Section title="Рекомендовано для вас" link="/recommend/1" tracks={tracks} />
      <Section title="Отслеживаемое" link="#" tracks={tracks} />
      <Section title="Чарт" link="/chart" tracks={tracks} isChart="true" />
    </>
  );
}

export default HomePage;
