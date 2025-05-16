import { useNavigate } from "react-router-dom";
// Components
import { SelectionPage } from "@/components/index.js";

function MusiciansPage() {
  const navigate = useNavigate();
  const musicians = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    name: `Исполнитель ${i + 1}`,
  }));

  function handleNext(selectedIds) {
    const selectedNames = musicians
      .filter(a => selectedIds.includes(a.id))
      .map(a => a.name)
      .join(", ");
    console.log("Вы выбрали артистов: " + selectedNames);
    navigate("/home");
  }

  return (
    <SelectionPage
      title="Выберите любимых исполнителей"
      items={musicians}
      onNextClick={handleNext}
    />
  );
}

export default MusiciansPage;
