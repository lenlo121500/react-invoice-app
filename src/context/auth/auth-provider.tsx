/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { AuthContext, type User } from "./auth-context";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to parse user data", error);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
      }
    }
    setLoading(false);
  }, []);

  if (loading) return null;

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (user) {
        const userData = { id: user.id, email: user.email, name: user.name };
        const token = `token_${Date.now()}_${Math.random()}`;

        localStorage.setItem("auth_token", token);
        localStorage.setItem("user_data", JSON.stringify(userData));

        setUser(userData);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      if (users.find((u: any) => u.email === email)) {
        return false; // User already exists
      }

      const newUser = {
        id: `user_${Date.now()}_${Math.random()}`,
        name,
        email,
        password,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
