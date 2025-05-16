import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);
  const navigate = useNavigate();

  // Проверка авторизации при загрузке
  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Проверка валидности токена
  const checkAuth = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user);
      setHasCompletedSetup(data.user.hasCompletedSetup || false);
    } catch (error) {
      localStorage.removeItem("jwt_token");
    } finally {
      setIsLoading(false);
    }
  };

  // Вход
  const login = async credentials => {
    const { data } = await api.post("/auth/login", credentials);
    localStorage.setItem("jwt_token", data.token);
    setUser(data.user);
    setHasCompletedSetup(data.user.hasCompletedSetup || false);
    navigate("/home");
  };

  // Регистрация
  const register = async userData => {
    const { data } = await api.post("/auth/register", userData);
    localStorage.setItem("jwt_token", data.token);
    setUser(data.user);
    setHasCompletedSetup(false);
    navigate("/genres");
  };

  // Завершение начальной настройки
  const completeSetup = async () => {
    try {
      const { data } = await api.post("/auth/complete-setup");
      setHasCompletedSetup(true);
      setUser(prev => ({ ...prev, hasCompletedSetup: true }));
      navigate("/home");
    } catch (error) {
      console.error("Ошибка при завершении настройки:", error);
    }
  };

  // Выход
  const logout = () => {
    localStorage.removeItem("jwt_token");
    setUser(null);
    setHasCompletedSetup(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        completeSetup,
        isAuthenticated: !!user,
        hasCompletedSetup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
