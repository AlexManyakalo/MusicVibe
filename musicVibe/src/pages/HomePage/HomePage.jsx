import Section from "@/components/Section/Section.jsx";

function HomePage({ songs }) {
  return (
    <>
      <Section title="Рекомендовано для вас" link="#" songs={songs} />
      <Section title="Новинки" link="#" songs={songs} />
      <Section title="Чарт" link="#" songs={songs} isChart="true" />
    </>
  );
}

export default HomePage;
