import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ListaUsuario from "./pages/usuarios/ListaUsuario";
import Roles from "./pages/usuarios/Roles";
import ListaClientes from "./pages/clientes/ListaClientes";
import PagoMensualidades from "./pages/clientes/PagoMensualidades";
import ListaSucursales from "./pages/sucurales/ListaSucursales";
import Login from "./pages/Login";

import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";


// 🚀 Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Contenedor de notificaciones */}
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
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/usuarios" element={<ListaUsuario />} />
                    <Route path="/usuarios/Roles" element={<Roles />} />
                    <Route path="/sucursales" element={<ListaSucursales />} />
                    <Route path="/clientes" element={<ListaClientes />} />
                    <Route path="/clientes/pagos" element={<PagoMensualidades />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </MainLayout>
              </PrivateRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
