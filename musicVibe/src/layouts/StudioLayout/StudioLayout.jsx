import { Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  HomeIcon,
  AddTrackIcon,
  SettingsIcon,
  HeadphonesIcon,
} from "@/components/index.js";
import NavBarBig from "@/components/NavBarBig/NavBarBig";
// Styles
import styles from "./StudioLayout.module.scss";

function StudioLayout() {
  const { user } = useAuth();

  const mainNavItems = [
    {
      path: "/home",
      icon: <HomeIcon />,
      label: "Главная",
    },
    {
      path: "/studio/content",
      icon: <AddTrackIcon />,
      label: "Контент",
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
      logoText="MV Studio"
      logoPath="/studio/content"
      className={styles.layout}
    >
      <Outlet />
    </NavBarBig>
  );
}

export default StudioLayout;
