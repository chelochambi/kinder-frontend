import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user || !user.sucursales) {
    return <p className="text-center mt-5">Cargando información del usuario...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Bienvenido, {user.username}</h2>

      <div className="row">
        {user.sucursales.map((sucursal) => (
          <div className="col-md-6 mb-3" key={sucursal.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{sucursal.nombre}</h5>
                <p className="card-text">
                  Información resumida de la sucursal...
                </p>
                <button className="btn btn-outline-primary btn-sm">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
