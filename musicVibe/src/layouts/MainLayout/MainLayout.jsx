import { Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Player } from "@/components/index.js";
import {
  SearchIcon,
  HomeIcon,
  NoteIcon,
  SettingsIcon,
  HeadphonesIcon,
} from "@/components/index.js";
import NavBarBig from "@/components/NavBarBig/NavBarBig";
// Styles
import styles from "./MainLayout.module.scss";

function MainLayout() {
  const { user } = useAuth();

  const mainNavItems = [
    {
      path: "/search",
      icon: <SearchIcon />,
      label: "Поиск",
    },
    {
      path: "/home",
      icon: <HomeIcon />,
      label: "Главная",
    },
    {
      path: "/my-music",
      icon: <NoteIcon />,
      label: "Моя музыка",
    },
  ];

  const menuNavItems = [
    {
      path: `/profile/profile-settings/${user?.id}`,
      icon: <SettingsIcon />,
      label: "Профиль",
    },
    {
      path: `/studio/content`,
      icon: <HeadphonesIcon />,
      label: "Студия",
    },
  ];

  return (
    <NavBarBig
      mainNavItems={mainNavItems}
      menuNavItems={menuNavItems}
      className={styles.layout}
    >
      <Outlet />
      <Player />
    </NavBarBig>
  );
}

export default MainLayout;
