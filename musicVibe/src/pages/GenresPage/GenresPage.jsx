import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";
// Components
import { SelectionPage, Loader } from "@/components/index.js";

function GenresPage() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await api.get("/genres");
        setGenres(res.data);
      } catch (err) {
        console.error("Ошибка при получении жанров:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGenres();
  }, []);

  async function handleNext(selectedIds) {
    try {
      await api.post("/user/genres", { genreIds: selectedIds });
      navigate("/musicians");
    } catch (err) {
      console.error("Ошибка при сохранении жанров:", err);
    }
  }

  if (loading) return <Loader />;

  return (
    <SelectionPage
      title="Выберите любимые жанры"
      items={genres}
      onNextClick={handleNext}
    />
  );
}

export default GenresPage;


[
  {
    "id": 1,
    "name": "Алексей Ветров",
    "avatarUrl": "/avatarUser/ava1.png",
  }
]