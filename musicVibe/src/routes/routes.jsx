import { Routes, Route } from "react-router-dom";

import StartPage from "@/pages/StartPage/StartPage.jsx";
import LoginPage from "@/pages/LoginPage/LoginPage.jsx";
import RegisterPage from "@/pages/RegisterPage/RegisterPage.jsx";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage.jsx";

import MainLayout from "@/layouts/MainLayout/MainLayout.jsx";
import HomePage from "@/pages/HomePage/HomePage.jsx";
import SearchPage from "@/pages/SearchPage/SearchPage.jsx";
import MyMusicPage from "@/pages/MyMusicPage/MyMusicPage.jsx";
import CommunityPage from "@/pages/CommunityPage/CommunityPage.jsx";
import GenresPage from "@/pages/GenresPage/GenresPage.jsx";
import MusiciansPage from "@/pages/MusiciansPage/MusiciansPage.jsx";
import MusicianPage from "@/pages/MusicianPage/MusicianPage.jsx";
import TrackPage from "@/pages/TrackPage/TrackPage.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Страницы без лэйаута */}
      <Route path="/" element={<StartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/genres" element={<GenresPage />} />
      <Route path="/musicians" element={<MusiciansPage />} />

      {/* Обёрнутые в лэйаут */}
      <Route path="/" element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/my-music" element={<MyMusicPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/musician/:id" element={<MusicianPage />} />
        <Route path="/track/:id" element={<TrackPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
// const AppRoutes = () => {
//   const navigationRoutes = [
//     { path: "/", element: <StartPage /> },
//     { path: "*", element: <NotFoundPage /> },
//   ];
//   return (
//     <Routes>
//       {navigationRoutes.map(route => (
//         <Route
//           ket={route.path}
//           path={route.path}
//           element={route.element}
//         ></Route>
//       ))}
//     </Routes>
//   );
// };

export default AppRoutes;
