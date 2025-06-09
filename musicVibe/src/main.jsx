import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { PlayerProvider } from "@/context/PlayerContext";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { FavoriteAlbumsProvider } from "@/context/FavoriteAlbumsContext";
import { FollowingProvider } from "@/context/FollowingContext";
import "./styles/main.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PlayerProvider>
          <FavoritesProvider>
            <FavoriteAlbumsProvider>
              <FollowingProvider>
                <App />
              </FollowingProvider>
            </FavoriteAlbumsProvider>
          </FavoritesProvider>
        </PlayerProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
