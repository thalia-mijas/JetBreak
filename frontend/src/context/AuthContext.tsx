// context/AuthContext.tsx
import { addToast } from "@heroui/react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import * as authService from "../services/authentication";

export type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

import { AuthContext } from "./AuthContextInstance";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si hay sesión al cargar la app
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    setIsAuthenticated(!!token);
  }, []);

  const login = async (email: string, password: string) => {
    authService
      .login(email, password)
      .then((data) => {
        console.log("Respuesta del login:", data);
        if (data.message === "Login successful") {
          if (data.token) {
            document.cookie = `token=${data.token}; path=/;`;
            setIsAuthenticated(true);
            localStorage.setItem("user_id", data.user.id);
          }
          addToast({
            title: "Inicio de sesión",
            description: "Has iniciado sesión con éxito",
            color: "success",
            icon: (
              <svg height={24} viewBox="0 0 24 24" width={24}>
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit={10}
                  strokeWidth={1.5}
                >
                  <path
                    d="M20.364 5.636L9 17l-5.364-5.364"
                    data-name="Stroke 1"
                  />
                </g>
              </svg>
            ),
          });
        } else {
          addToast({
            title: "Error de inicio de sesión",
            description: data?.message || "No se pudo iniciar sesión",
            color: "danger",
            icon: (
              <svg height={24} viewBox="0 0 24 24" width={24}>
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit={10}
                  strokeWidth={1.5}
                >
                  <path d="M18 6L6 18M6 6l12 12" data-name="Stroke 1" />
                </g>
              </svg>
            ),
          });
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  const logout = () => {
    authService
      .logout()
      .then((data) => {
        if (data.message === "Logout successful") {
          document.cookie = "";
          setIsAuthenticated(false);
          localStorage.removeItem("user_id");
          addToast({
            title: "Cierre de sesión",
            description: "Sesión cerrada con éxito",
            color: "success",
            icon: (
              <svg height={24} viewBox="0 0 24 24" width={24}>
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit={10}
                  strokeWidth={1.5}
                >
                  <path
                    d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
                    data-name="Stroke 1"
                  />
                  <path
                    d="M11.837 11.174a4.372 4.372 0 10-.031 0z"
                    data-name="Stroke 3"
                  />
                </g>
              </svg>
            ),
          });
        }
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
