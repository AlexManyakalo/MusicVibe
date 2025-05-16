import { Route, Navigate } from "react-router-dom";
import LoadPage from "@/components/LoadPage/LoadPage";
import { useAuth } from "@/context/AuthContext";

// Компонент для защиты приватных маршрутов
const ProtectedRoute = ({ element: Component }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <LoadPage Component={Component} />;
};

// Компонент для защиты маршрутов начальной настройки
const SetupRoute = ({ element: Component }) => {
  const { isAuthenticated, hasCompletedSetup, isLoading } = useAuth();

  if (isLoading) {
    return <LoadPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (hasCompletedSetup) {
    return <Navigate to="/home" replace />;
  }

  return <LoadPage Component={Component} />;
};

// Генератор для всех маршрутов
export const generateRoutes = (routes, type = "public") => {
  return routes.map(route => {
    const { path, element: Component } = route;

    switch (type) {
      case "private":
        return (
          <Route
            key={path}
            path={path}
            element={<ProtectedRoute element={Component} />}
          />
        );
      case "setup":
        return (
          <Route
            key={path}
            path={path}
            element={<SetupRoute element={Component} />}
          />
        );
      default:
        return (
          <Route
            key={path}
            path={path}
            element={<LoadPage Component={Component} />}
          />
        );
    }
  });
};
