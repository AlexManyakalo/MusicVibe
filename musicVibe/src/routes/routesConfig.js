import { lazy } from "react";

// Ленивая загрузка компонентов
const StartPage = lazy(() => import("@/pages/StartPage/StartPage.jsx"));
const LoginPage = lazy(() => import("@/pages/LoginPage/LoginPage.jsx"));
const RegisterPage = lazy(
  () => import("@/pages/RegisterPage/RegisterPage.jsx"),
);
const GenresPage = lazy(() => import("@/pages/GenresPage/GenresPage.jsx"));
const MusiciansPage = lazy(
  () => import("@/pages/MusiciansPage/MusiciansPage.jsx"),
);
const HomePage = lazy(() => import("@/pages/HomePage/HomePage.jsx"));
const SearchPage = lazy(() => import("@/pages/SearchPage/SearchPage.jsx"));
const MyMusicPage = lazy(() => import("@/pages/MyMusicPage/MyMusicPage.jsx"));
const CommunityPage = lazy(
  () => import("@/pages/CommunityPage/CommunityPage.jsx"),
);
const SettingsProfilePage = lazy(
  () => import("@/pages/SettingsProfilePage/SettingsProfilePage.jsx"),
);
const SettingsCardPage = lazy(
  () => import("@/pages/SettingsCardPage/SettingsCardPage.jsx"),
);
const StudioPage = lazy(() => import("@/pages/StudioPage/StudioPage.jsx"));
const SubscribePage = lazy(
  () => import("@/pages/SubscribePage/SubscribePage.jsx"),
);
const SupportPage = lazy(() => import("@/pages/SupportPage/SupportPage.jsx"));
const RecommendPage = lazy(
  () => import("@/pages/RecommendPage/RecommendPage.jsx"),
);
const TrackedPage = lazy(() => import("@/pages/TrackedPage/TrackedPage.jsx"));
const NewPage = lazy(() => import("@/pages/NewPage/NewPage.jsx"));
const ChartPage = lazy(() => import("@/pages/ChartPage/ChartPage.jsx"));
const PopularTracksPage = lazy(
  () => import("@/pages/PopularTracksPage/PopularTracksPage.jsx"),
);
const AlbumsPage = lazy(() => import("@/pages/AlbumsPage/AlbumsPage.jsx"));
const MusicianPage = lazy(
  () => import("@/pages/MusicianPage/MusicianPage.jsx"),
);
const TrackPage = lazy(() => import("@/pages/TrackPage/TrackPage.jsx"));
const NotFoundPage = lazy(
  () => import("@/pages/NotFoundPage/NotFoundPage.jsx"),
);

// Публичные маршруты (доступные без авторизации)
export const publicRoutes = [
  {
    path: "/",
    element: StartPage,
  },
  {
    path: "/auth/login",
    element: LoginPage,
  },
  {
    path: "/auth/register",
    element: RegisterPage,
  },
];

// Маршруты, требующие авторизации
export const privateRoutes = [
  {
    path: "/genres",
    element: GenresPage,
  },
  {
    path: "/musicians",
    element: MusiciansPage,
  },
  {
    path: "/home",
    element: HomePage,
  },
  {
    path: "/search",
    element: SearchPage,
  },
  {
    path: "/my-music",
    element: MyMusicPage,
  },
  {
    path: "/community",
    element: CommunityPage,
  },
  {
    path: "/profile/profile-settings/:id",
    element: SettingsProfilePage,
  },
  {
    path: "/profile/card-settings/:id",
    element: SettingsCardPage,
  },
  {
    path: "/studio/:id",
    element: StudioPage,
  },
  {
    path: "/subscribe/:id",
    element: SubscribePage,
  },
  {
    path: "/support/:id",
    element: SupportPage,
  },
  {
    path: "/recommend/:id",
    element: RecommendPage,
  },
  {
    path: "/tracked/:id",
    element: TrackedPage,
  },
  {
    path: "/new",
    element: NewPage,
  },
  {
    path: "/chart",
    element: ChartPage,
  },
  {
    path: "/popular-tracks/:id",
    element: PopularTracksPage,
  },
  {
    path: "/albums/:id",
    element: AlbumsPage,
  },
  {
    path: "/musician/:id",
    element: MusicianPage,
  },
  {
    path: "/track/:id",
    element: TrackPage,
  },
];

// Маршрут для несуществующих страниц
export const notFoundRoute = {
  path: "*",
  element: NotFoundPage,
};
