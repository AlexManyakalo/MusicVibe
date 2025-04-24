import SelectionPage from "../../components/SelectionPage/SelectionPage";

function MusiciansPage() {
  const musicians = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    name: `Исполнитель ${i + 1}`,
  }));

  const handleNext = selectedIds => {
    const selectedNames = musicians
      .filter(a => selectedIds.includes(a.id))
      .map(a => a.name)
      .join(", ");
    console.log("Вы выбрали артистов: " + selectedNames);
  };

  return (
    <SelectionPage
      title="Выберите любимых исполнителей"
      items={musicians}
      onNextClick={handleNext}
    />
  );
}

export default MusiciansPage;
