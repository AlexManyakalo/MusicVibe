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
  const [recommendedAlbums, setRecommendedAlbums] = useState([]);
  const [trackedTracks, setTrackedTracks] = useState([]);
  const [chartTracks, setChartTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          recommendedTracksRes,
          recommendedAlbumsRes,
          trackedRes,
          chartRes,
        ] = await Promise.all([
          api.get("/tracks/recommended?limit=8"),
          api.get("/albums/recommended?limit=6"),
          api.get("/tracks/tracked?limit=8"),
          api.get("/tracks/chart?limit=8"),
        ]);

        setRecommendedTracks(recommendedTracksRes.data);
        setRecommendedAlbums(recommendedAlbumsRes.data);
        setTrackedTracks(trackedRes.data);
        setChartTracks(chartRes.data);
      } catch (err) {
        console.error("Ошибка при получении данных:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Section
        title="Рекомендованные треки"
        link="/recommend"
        tracks={recommendedTracks}
      />
      <Section
        title="Рекомендованные альбомы"
        link="/recommend-albums"
        albums={recommendedAlbums}
      />
      <Section title="Отслеживаемое" link="/tracked" tracks={trackedTracks} />
      <Section title="Чарт" link="/chart" tracks={chartTracks} isChart="true" />
    </>
  );
}

export default HomePage;
