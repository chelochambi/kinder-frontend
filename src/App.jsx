// src/App.jsx
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth, AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppRoutes() {
  const { usuario, loading } = useAuth();
  if (loading) return <div className="pantalla-cargando">Cargando sesión...</div>;

  const renderDynamicRoutes = (menus) => {
    const routes = [];

    const addRoutes = (menuItems) => {
      menuItems.forEach((menu) => {
        if (menu.componente && menu.pagina) {
          try {
            const LazyComponent = React.lazy(() =>
              import(/* @vite-ignore */ `${menu.pagina}`)
            );

            routes.push(
              <Route
                key={menu.ruta}
                path={menu.ruta.replace(/^\//, "")}
                element={
                  <Suspense fallback={<div>Cargando...</div>}>
                    <LazyComponent />
                  </Suspense>
                }
              />
            );
          } catch (err) {
            console.error("Error cargando componente:", menu.pagina, err);
          }
        }

        if (menu.submenus) {
          addRoutes(menu.submenus);
        }
      });
    };

    addRoutes(usuario?.menus || []);
    return routes;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <MainLayout>
              <Routes>
                {renderDynamicRoutes(usuario?.menus || [])}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
