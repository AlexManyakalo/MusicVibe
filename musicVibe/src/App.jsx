import { useState } from "react";

import StartPage from "./pages/StartPage/StartPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import GenresPage from "./pages/GenresPage/GenresPage.jsx";
import MusiciansPage from "./pages/MusiciansPage/MusiciansPage.jsx";
import MainLayout from "./layouts/MainLayout/MainLayout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";

import "./App.module.scss";

function App() {
  // return <StartPage />;
  // return <LoginPage />;
  // return <RegisterPage />;
  // return <GenresPage />;
  // return <MusiciansPage />;
  return (
    <MainLayout>
      <HomePage />
    </MainLayout>
  );
}

export default App;
