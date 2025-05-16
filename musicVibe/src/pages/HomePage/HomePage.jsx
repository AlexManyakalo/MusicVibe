import { useEffect, useState } from "react";
import api from "@/api";
// Components
import { Section, Loader } from "@/components/index.js";

// TODO:
// На этой странице запросы должны быть на только необходимые треки
// Например, 8 треков для рекомендаций, 8 треков для отслеживаемого и 8 треков чарта (всего 3 запроса)
// Для дочерних страниц запросы должны быть на все треки

function HomePage() {
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [trackedTracks, setTrackedTracks] = useState([]);
  const [chartTracks, setChartTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const [recommendedRes, trackedRes, chartRes] = await Promise.all([
          api.get("/tracks/recommended?limit=8"),
          api.get("/tracks/tracked?limit=8"),
          api.get("/tracks/chart?limit=8"),
        ]);

        setRecommendedTracks(recommendedRes.data);
        setTrackedTracks(trackedRes.data);
        setChartTracks(chartRes.data);
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
      <Section
        title="Рекомендовано для вас"
        link="/recommend"
        tracks={recommendedTracks}
      />
      <Section title="Отслеживаемое" link="/tracked" tracks={trackedTracks} />
      <Section title="Чарт" link="/chart" tracks={chartTracks} isChart="true" />
    </>
  );
}

export default HomePage;
