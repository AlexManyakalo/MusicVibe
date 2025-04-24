import SelectionPage from "../../components/SelectionPage/SelectionPage";

function GenresPage() {
  const genres = Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    name: `Жанр ${i + 1}`,
  }));

  const handleNext = selectedIds => {
    const selectedNames = genres
      .filter(g => selectedIds.includes(g.id))
      .map(g => g.name)
      .join(", ");
    console.log("Вы выбрали: " + selectedNames);
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
