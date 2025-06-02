// src/layout/MainLayout.jsx
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="d-flex flex-column flex-grow-1">
        <Header />
        <main className="flex-grow-1 p-4 bg-light">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
