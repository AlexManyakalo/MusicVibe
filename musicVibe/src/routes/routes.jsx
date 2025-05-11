import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import LoadPage from "@/components/LoadPage/LoadPage";

import MainLayout from "@/layouts/MainLayout/MainLayout.jsx";

// Ленивая загрузка
const StartPage = lazy(() => import("@/pages/StartPage/StartPage.jsx"));
const LoginPage = lazy(() => import("@/pages/LoginPage/LoginPage.jsx"));
const RegisterPage = lazy(
  () => import("@/pages/RegisterPage/RegisterPage.jsx"),
);
const NotFoundPage = lazy(
  () => import("@/pages/NotFoundPage/NotFoundPage.jsx"),
);
const HomePage = lazy(() => import("@/pages/HomePage/HomePage.jsx"));
const SearchPage = lazy(() => import("@/pages/SearchPage/SearchPage.jsx"));
const MyMusicPage = lazy(() => import("@/pages/MyMusicPage/MyMusicPage.jsx"));
const CommunityPage = lazy(
  () => import("@/pages/CommunityPage/CommunityPage.jsx"),
);
const GenresPage = lazy(() => import("@/pages/GenresPage/GenresPage.jsx"));
const MusiciansPage = lazy(
  () => import("@/pages/MusiciansPage/MusiciansPage.jsx"),
);
const MusicianPage = lazy(
  () => import("@/pages/MusicianPage/MusicianPage.jsx"),
);
const TrackPage = lazy(() => import("@/pages/TrackPage/TrackPage.jsx"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoadPage Component={StartPage} />} />
      <Route path="/auth/login" element={<LoadPage Component={LoginPage} />} />
      <Route
        path="/auth/register"
        element={<LoadPage Component={RegisterPage} />}
      />
      <Route path="/genres" element={<LoadPage Component={GenresPage} />} />
      <Route
        path="/musicians"
        element={<LoadPage Component={MusiciansPage} />}
      />

      <Route path="/" element={<MainLayout />}>
        <Route path="/home" element={<LoadPage Component={HomePage} />} />
        <Route path="/search" element={<LoadPage Component={SearchPage} />} />
        <Route
          path="/my-music"
          element={<LoadPage Component={MyMusicPage} />}
        />
        <Route
          path="/community"
          element={<LoadPage Component={CommunityPage} />}
        />
        <Route
          path="/musician/:id"
          element={<LoadPage Component={MusicianPage} />}
        />
        <Route path="/track/:id" element={<LoadPage Component={TrackPage} />} />
      </Route>

      <Route path="*" element={<LoadPage Component={NotFoundPage} />} />
    </Routes>
  );
};

export default AppRoutes;
