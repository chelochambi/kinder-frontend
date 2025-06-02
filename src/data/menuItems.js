// src/data/menuItems.js
import { FaHome, FaUsers, FaBuilding, FaUserFriends, FaChevronDown, FaChevronUp } from "react-icons/fa";

export const menuItems = [
  {
    id: 1,
    label: "Inicio",
    icon: FaHome,
    path: "/",
  },
  {
    id: 2,
    label: "Usuarios",
    icon: FaUsers,
    subMenus: [
      { id: 21, label: "Administrar usuarios", path: "/usuarios" },
      { id: 22, label: "Roles", path: "/roles" },
    ],
  },
  {
    id: 3,
    label: "Sucursales",
    icon: FaBuilding,
    path: "/sucursales",
  },
  {
    id: 4,
    label: "Clientes",
    icon: FaUserFriends,
    subMenus: [
      { id: 41, label: "Listado clientes", path: "/clientes" },
      { id: 42, label: "Clientes VIP", path: "/clientes/vip" },
    ],
  },
];
