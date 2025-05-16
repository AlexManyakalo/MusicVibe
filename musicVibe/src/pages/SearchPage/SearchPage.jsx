import { useEffect, useState } from "react";
import api from "@/api";
// Components
import { Input, Section, Loader } from "@/components/index.js";

function SearchPage() {
  const [newTracks, setNewTracks] = useState([]);
  const [chartTracks, setChartTracks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const [newRes, chartRes] = await Promise.all([
          api.get("/tracks/new?limit=8"),
          api.get("/tracks/chart?limit=8"),
        ]);

        setNewTracks(newRes.data);
        setChartTracks(chartRes.data);
      } catch (err) {
        console.error("Ошибка при получении треков:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTracks();
  }, []);

  // Поиск треков при изменении поискового запроса
  useEffect(() => {
    async function searchTracks() {
      if (!search.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await api.get(
          `/tracks/search?q=${encodeURIComponent(search)}`,
        );
        setSearchResults(res.data);
      } catch (err) {
        console.error("Ошибка при поиске треков:", err);
      }
    }

    // Добавляем небольшую задержку перед отправкой запроса
    const timer = setTimeout(searchTracks, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Обработка изменения поиска
  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  if (loading) return <Loader />;

  return (
    <>
      <Input
        placeholder="Трек, альбом, музыкант"
        isSearch="true"
        value={search}
        onChange={handleSearchChange}
      />
      {search.trim() ? (
        <Section title="Результаты поиска" tracks={searchResults} />
      ) : (
        <>
          <Section title="Новинки" link="/new" tracks={newTracks} />
          <Section
            title="Чарт"
            link="/chart"
            tracks={chartTracks}
            isChart="true"
          />
        </>
      )}
    </>
  );
}

export default SearchPage;
