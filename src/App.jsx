// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useAuth, AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";

import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Mapea las rutas de menú con los componentes correspondientes
import { routeComponentMap } from "./routes/routeConfig";

function App() {
  const { usuario } = useAuth();

  // Carga los menús del localStorage (puedes ajustarlo para que venga de contexto si quieres)
  const menus = JSON.parse(localStorage.getItem("menus") || "[]");

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        theme="colored"
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <MainLayout>
                <Routes>
                  {menus.map((menu) => {
                    const Componente = routeComponentMap[menu.ruta];
                    return (
                      Componente && (
                        <Route
                          key={menu.ruta}
                          path={menu.ruta.replace(/^\//, "")} // Quita la barra inicial para que React Router funcione bien
                          element={<Componente />}
                        />
                      )
                    );
                  })}
                  {/* Ruta fallback */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MainLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

// Envolvemos el App con AuthProvider y BrowserRouter para que useAuth funcione
export default function AppWrapper() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  );
}
