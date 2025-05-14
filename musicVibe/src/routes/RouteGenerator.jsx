import { Route } from "react-router-dom";
import LoadPage from "@/components/LoadPage/LoadPage";

export const generateRoute = ({ path, element: Component }) => (
  <Route key={path} path={path} element={<LoadPage Component={Component} />} />
);

export const generateRoutes = routes => routes.map(generateRoute);
