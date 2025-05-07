import SelectionPage from "@/components/SelectionPage/SelectionPage";
import { useNavigate } from "react-router-dom";

function GenresPage() {
  const navigate = useNavigate();
  const genres = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    name: `Жанр ${i + 1}`,
  }));

  function handleNext(selectedIds) {
    const selectedNames = genres
      .filter(g => selectedIds.includes(g.id))
      .map(g => g.name)
      .join(", ");
    console.log("Вы выбрали: " + selectedNames);
    navigate("/musicians");
  };

  return (
    <SelectionPage
      title="Выберите любимые жанры"
      items={genres}
      onNextClick={handleNext}
    />
  );
}

export default GenresPage;
