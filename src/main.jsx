import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BsHouseDoorFill, BsInfoCircleFill } from "react-icons/bs";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

<ToastContainer 
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={true}
  closeOnClick
  pauseOnHover
  draggable
/>

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
