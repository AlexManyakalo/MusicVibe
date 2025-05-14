import { useEffect, useState } from "react";
import api from "@/api";
// Components
import { Input, Section, Loader } from "@/components/index.js";
// Styles
import styles from "./SearchPage.module.scss";

function SearchPage() {
  const [tracks, setTracks] = useState([]);
  const [search, setSearch] = useState("");
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

  // Обработка изменения поиска
  function handleSearhChange(e) {
    setSearch(e.target.value);
  }

  if (loading) return <Loader />;

  return (
    <>
      <Input
        placeholder="Трек, альбом, музыкант"
        isSearch="true"
        value={search}
        onChange={handleSearhChange}
      />
      <Section title="Новинки" link="/new" tracks={tracks} />
      <Section title="Чарт" link="/chart" tracks={tracks} isChart="true" />
    </>
  );
}

export default SearchPage;
