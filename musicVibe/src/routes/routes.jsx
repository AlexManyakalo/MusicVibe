import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout/MainLayout.jsx";
import StudioLayout from "@/layouts/StudioLayout/StudioLayout.jsx";
import { publicRoutes, privateRoutes, notFoundRoute } from "./routesConfig";
import { generateRoutes } from "./RouteGenerator";

const AppRoutes = () => {
  // Фильтруем маршруты начальной настройки
  const setupRoutes = privateRoutes.filter(
    route => route.path === "/genres" || route.path === "/musicians",
  );

  // Маршруты студии
  const studioRoutes = privateRoutes.filter(route =>
    route.path.startsWith("/studio"),
  );

  // Остальные приватные маршруты
  const otherPrivateRoutes = privateRoutes.filter(
    route =>
      route.path !== "/genres" &&
      route.path !== "/musicians" &&
      !route.path.startsWith("/studio"),
  );

  return (
    <Routes>
      {/* Публичные маршруты */}
      {generateRoutes(publicRoutes)}

      {/* Маршруты начальной настройки */}
      {generateRoutes(setupRoutes, "setup")}

      {/* Защищенные маршруты внутри MainLayout */}
      <Route path="/" element={<MainLayout />}>
        {generateRoutes(otherPrivateRoutes, "private")}
      </Route>

      {/* Маршруты студии */}
      <Route path="/studio" element={<StudioLayout />}>
        {generateRoutes(studioRoutes, "private")}
      </Route>

      {/* Маршрут для несуществующих страниц */}
      {generateRoutes([notFoundRoute])}
    </Routes>
  );
};

export default AppRoutes;
