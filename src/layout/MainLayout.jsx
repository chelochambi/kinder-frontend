// src/layout/MainLayout.jsx
import Header from "/src/components/Header";
import Sidebar from "/src/components/Sidebar";
import Footer from "/src/components/Footer";
import Breadcrumb from "/src/components/Breadcrumb";

export default function MainLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="d-flex flex-column flex-grow-1">
        <Header />
        <main className="flex-grow-1 p-4 bg-light">
          <Breadcrumb />
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
