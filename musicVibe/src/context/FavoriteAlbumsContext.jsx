import { createContext, useContext, useState, useEffect } from "react";
import api from "@/api";

const FavoriteAlbumsContext = createContext();

export function FavoriteAlbumsProvider({ children }) {
  const [favoriteAlbums, setFavoriteAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка избранных альбомов при монтировании
  useEffect(() => {
    loadFavoriteAlbums();
  }, []);

  const loadFavoriteAlbums = async () => {
    try {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        setFavoriteAlbums([]);
        setIsLoading(false);
        return;
      }

      const response = await api.get("/favorites/albums");
      setFavoriteAlbums(response.data);
    } catch (error) {
      console.error(
        "Ошибка при загрузке избранных альбомов:",
        error.response?.data || error.message,
      );
      setFavoriteAlbums([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavoriteAlbums = async albumId => {
    try {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        return;
      }

      await api.post(`/favorites/albums/${albumId}`);
      setFavoriteAlbums(prev => {
        const newFavorites = [...prev, albumId];
        return newFavorites;
      });
    } catch (error) {
      console.error(
        "Ошибка при добавлении альбома в избранное:",
        error.response?.data || error.message,
      );
    }
  };

  const removeFromFavoriteAlbums = async albumId => {
    try {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        return;
      }

      await api.delete(`/favorites/albums/${albumId}`);
      setFavoriteAlbums(prev => {
        const newFavorites = prev.filter(id => id !== albumId);
        return newFavorites;
      });
    } catch (error) {
      console.error(
        "Ошибка при удалении альбома из избранного:",
        error.response?.data || error.message,
      );
    }
  };

  const isFavoriteAlbum = albumId => {
    const isFavorite = favoriteAlbums.includes(albumId);
    return isFavorite;
  };

  return (
    <FavoriteAlbumsContext.Provider
      value={{
        favoriteAlbums,
        isLoading,
        addToFavoriteAlbums,
        removeFromFavoriteAlbums,
        isFavoriteAlbum,
      }}
    >
      {children}
    </FavoriteAlbumsContext.Provider>
  );
}

export function useFavoriteAlbums() {
  const context = useContext(FavoriteAlbumsContext);
  if (!context) {
    throw new Error(
      "useFavoriteAlbums must be used within a FavoriteAlbumsProvider",
    );
  }
  return context;
}
