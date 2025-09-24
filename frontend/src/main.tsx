import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <HeroUIProvider>
        <ToastProvider />
        <App />
      </HeroUIProvider>
    </AuthProvider>
  </StrictMode>
);
