import { createContext, useContext, useState, useEffect } from "react";
import api from "@/api";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка избранных треков при монтировании
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        setFavorites([]);
        setIsLoading(false);
        return;
      }

      const response = await api.get("/favorites");
      setFavorites(response.data);
    } catch (error) {
      console.error(
        "Ошибка при загрузке избранных треков:",
        error.response?.data || error.message,
      );
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = async trackId => {
    try {
      const token = localStorage.getItem("jwt_token");

      if (!token) {
        return;
      }

      await api.post(`/favorites/${trackId}`);
      setFavorites(prev => [...prev, trackId]);
    } catch (error) {
      console.error(
        "Ошибка при добавлении в избранное:",
        error.response?.data || error.message,
      );
    }
  };

  const removeFromFavorites = async trackId => {
    try {
      const token = localStorage.getItem("jwt_token");

      if (!token) {
        return;
      }

      await api.delete(`/favorites/${trackId}`);
      setFavorites(prev => prev.filter(id => id !== trackId));
    } catch (error) {
      console.error(
        "Ошибка при удалении из избранного:",
        error.response?.data || error.message,
      );
    }
  };

  const isFavorite = trackId => {
    return favorites.includes(trackId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isLoading,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
