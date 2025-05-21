import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";
// Components
import { SelectionPage, Loader } from "@/components/index.js";

function MusiciansPage() {
  const navigate = useNavigate();
  const [musicians, setMusicians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMusicians() {
      try {
        const res = await api.get("/musicians");
        setMusicians(res.data);
      } catch (err) {
        console.error("Ошибка при получении списка музыкантов:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMusicians();
  }, []);

  async function handleNext(selectedIds) {
    try {
      await api.post("/user/following", { musicianIds: selectedIds });
      navigate("/home"); // или куда нужно перейти после выбора музыкантов
    } catch (err) {
      console.error("Ошибка при сохранении выбранных музыкантов:", err);
    }
  }

  if (loading) return <Loader />;

  return (
    <SelectionPage
      title="Выберите интересных вам музыкантов"
      items={musicians}
      onNextClick={handleNext}
      type="musician"
    />
  );
}

export default MusiciansPage;
