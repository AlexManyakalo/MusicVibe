import { useState } from "react";

import StartPage from "./pages/StartPage/StartPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import GenresPage from "./pages/GenresPage/GenresPage.jsx";
import MusiciansPage from "./pages/MusiciansPage/MusiciansPage.jsx";
import MainLayout from "./layouts/MainLayout/MainLayout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import MusicianPage from "./pages/MusicianPage/MusicianPage.jsx";
import TrackPage from "./pages/TrackPage/TrackPage.jsx";

import previewImage1 from "@/assets/images/1.jpg";
import previewImage2 from "@/assets/images/2.jpg";
import previewImage3 from "@/assets/images/3.jpg";
import previewImage4 from "@/assets/images/4.jpg";
import previewImage5 from "@/assets/images/5.jpg";

import "./App.module.scss";

function App() {
  const songs = [
    { id: 1, image: previewImage1 },
    { id: 2, image: previewImage3 },
    { id: 3, image: previewImage2 },
    { id: 4, image: previewImage5 },
    { id: 5, image: previewImage4 },
    { id: 6, image: previewImage5 },
    { id: 7, image: previewImage4 },
  ];

  // return <StartPage />;
  // return <LoginPage />;
  // return <RegisterPage />;
  // return <GenresPage />;
  // return <MusiciansPage />;
  return (
    <MainLayout>
      {/* <HomePage songs={songs} /> */}
      {/* <MusicianPage songs={songs} /> */}
      <TrackPage songs={songs} />
    </MainLayout>
  );
}

export default App;
