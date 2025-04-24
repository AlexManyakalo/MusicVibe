import previewImage1 from "@/assets/images/1.jpg";
import previewImage2 from "@/assets/images/2.jpg";
import previewImage3 from "@/assets/images/3.jpg";
import previewImage4 from "@/assets/images/4.jpg";
import previewImage5 from "@/assets/images/5.jpg";

import Section from "@/components/Section/Section.jsx";

function HomePage() {
  const songs = [
    { id: 1, image: previewImage1 },
    { id: 2, image: previewImage3 },
    { id: 3, image: previewImage2 },
    { id: 4, image: previewImage5 },
    { id: 5, image: previewImage4 },
    { id: 6, image: previewImage5 },
    { id: 7, image: previewImage4 },
  ];

  return (
    <>
      <Section title="Рекомендовано для вас" link="#" songs={songs} />
      <Section title="Новинки" link="#" songs={songs} />
      <Section title="Чарт" link="#" songs={songs} />
    </>
  );
}

export default HomePage;
