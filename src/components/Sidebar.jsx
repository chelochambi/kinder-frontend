export default function Sidebar() {
  return (
    <div className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
      <h5>Kinder ERP</h5>
      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <a className="nav-link text-white" href="/">Inicio</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="/about">Acerca de</a>
        </li>
      </ul>
    </div>
  );
}
