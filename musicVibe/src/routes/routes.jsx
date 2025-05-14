import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout/MainLayout.jsx";
import { publicRoutes, privateRoutes, notFoundRoute } from "./routesConfig";
import { generateRoute, generateRoutes } from "./RouteGenerator";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Публичные маршруты */}
      {generateRoutes(publicRoutes)}

      {/* Защищенные маршруты внутри MainLayout */}
      <Route path="/" element={<MainLayout />}>
        {generateRoutes(privateRoutes)}
      </Route>

      {/* Маршрут для несуществующих страниц */}
      {generateRoute(notFoundRoute)}
    </Routes>
  );
};

export default AppRoutes;
