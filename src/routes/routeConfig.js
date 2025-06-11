// src/routes/routeConfig.js
import Dashboard from "/src/pages/Dashboard";
import ListaUsuario from "/src/pages/usuarios/ListaUsuario";
import Roles from "/src/pages/usuarios/Roles";
import ListaClientes from "/src/pages/clientes/ListaClientes";
import PagoMensualidades from "/src/pages/clientes/PagoMensualidades";
import ListaSucursales from "/src/pages/sucurales/ListaSucursales";

// Asocia la ruta a su componente correspondiente
export const routeComponentMap = {
  "/": Dashboard,
  "/seguridad/usuarios": ListaUsuario,
  "/seguridad/roles": Roles,
  "/seguridad/permisos": Roles, // O cambia por Permisos si tienes ese componente
  "/clientes": ListaClientes,
  "/clientes/pagos": PagoMensualidades,
  "/sucursales": ListaSucursales,
};
