import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout/MainLayout.jsx";
import { publicRoutes, privateRoutes, notFoundRoute } from "./routesConfig";
import { generateRoutes } from "./RouteGenerator";

const AppRoutes = () => {
  // Фильтруем маршруты начальной настройки
  const setupRoutes = privateRoutes.filter(
    route => route.path === "/genres" || route.path === "/musicians",
  );

  // Остальные приватные маршруты
  const otherPrivateRoutes = privateRoutes.filter(
    route => route.path !== "/genres" && route.path !== "/musicians",
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

      {/* Маршрут для несуществующих страниц */}
      {generateRoutes([notFoundRoute])}
    </Routes>
  );
};

export default AppRoutes;
