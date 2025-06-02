import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="d-flex flex-column flex-grow-1">
        <Header />
        <main className="flex-grow-1 p-4 bg-light">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
