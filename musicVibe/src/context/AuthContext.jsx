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
  async function checkAuth() {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.user);
      setHasCompletedSetup(data.user.hasCompletedSetup || false);
    } catch (error) {
      console.error("Ошибка проверки авторизации:", error);
      localStorage.removeItem("jwt_token");
      setUser(null);
      setHasCompletedSetup(false);
    } finally {
      setIsLoading(false);
    }
  }

  // Вход
  async function login(credentials) {
    try {
      const { data } = await api.post("/login", credentials);
      localStorage.setItem("jwt_token", data.token);
      setUser(data.user);
      setHasCompletedSetup(data.user.hasCompletedSetup || false);
      navigate("/home");
    } catch (error) {
      console.error("Ошибка входа:", error);
      throw error;
    }
  }

  // Регистрация
  async function register(userData) {
    try {
      const { data } = await api.post("/register", userData);
      localStorage.setItem("jwt_token", data.token);
      setUser(data.user);
      setHasCompletedSetup(false);
      navigate("/genres");
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      throw error;
    }
  }

  // Завершение начальной настройки
  async function completeSetup() {
    try {
      await api.post("/auth/complete-setup");
      setHasCompletedSetup(true);
      setUser(prev => ({ ...prev, hasCompletedSetup: true }));
      navigate("/home");
    } catch (error) {
      console.error("Ошибка при завершении настройки:", error);
      throw error;
    }
  }

  // Выход
  function logout() {
    localStorage.removeItem("jwt_token");
    setUser(null);
    setHasCompletedSetup(false);
    navigate("/");
  }

  if (isLoading) {
    return null; // или компонент загрузки
  }

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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
