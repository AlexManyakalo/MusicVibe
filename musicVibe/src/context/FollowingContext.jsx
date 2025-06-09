import { createContext, useContext, useState, useEffect } from "react";
import api from "@/api";

const FollowingContext = createContext();

export function FollowingProvider({ children }) {
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFollowing();
  }, []);

  const loadFollowing = async () => {
    try {
      const response = await api.get("/following");
      setFollowing(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке подписок:", error);
      setFollowing([]);
    } finally {
      setIsLoading(false);
    }
  };

  const followMusician = async musicianId => {
    try {
      await api.post(`/following/${musicianId}`);
      setFollowing(prev => [...prev, musicianId]);
    } catch (error) {
      console.error("Ошибка при подписке на музыканта:", error);
      throw error;
    }
  };

  const unfollowMusician = async musicianId => {
    try {
      await api.delete(`/following/${musicianId}`);
      setFollowing(prev => prev.filter(id => id !== musicianId));
    } catch (error) {
      console.error("Ошибка при отписке от музыканта:", error);
      throw error;
    }
  };

  const isFollowing = musicianId => {
    return following.includes(musicianId);
  };

  return (
    <FollowingContext.Provider
      value={{
        following,
        isLoading,
        followMusician,
        unfollowMusician,
        isFollowing,
      }}
    >
      {children}
    </FollowingContext.Provider>
  );
}

export function useFollowing() {
  const context = useContext(FollowingContext);
  if (!context) {
    throw new Error("useFollowing must be used within a FollowingProvider");
  }
  return context;
}
