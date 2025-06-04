// src/pages/Dashboard.jsx
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const totales = [
    { label: "Usuarios", value: 120, color: "primary" },
    { label: "Clientes", value: 45, color: "success" },
    { label: "Ingresos", value: 32000, color: "warning", prefix: "$" },
];

const coloresSucursal = ["#0d6efd", "#198754", "#ffc107"];
const dataSucursales = [
    { nombre: "Sucursal Centro", porcentaje: 65 },
    { nombre: "Sucursal Norte", porcentaje: 25 },
    { nombre: "Sucursal Sur", porcentaje: 10 },
];

const ventasPorHora = [
    { hora: "8 AM", ventas: 240 },
    { hora: "10 AM", ventas: 139 },
    { hora: "12 PM", ventas: 980 },
    { hora: "2 PM", ventas: 390 },
    { hora: "4 PM", ventas: 480 },
    { hora: "6 PM", ventas: 380 },
];

const noticias = [
    {
        titulo: "Módulo de facturación disponible",
        fecha: "2025-06-02",
        contenido: "Ya se encuentra habilitado el nuevo módulo para generar facturas electrónicas desde el sistema.",
    },
    {
        titulo: "Actualización del sistema",
        fecha: "2025-06-01",
        contenido: "Se aplicaron mejoras de rendimiento y seguridad en el backend. No requiere acciones por parte de los usuarios.",
    },
    {
        titulo: "Corte de servicio programado",
        fecha: "2025-06-04",
        contenido: "El sistema estará en mantenimiento el domingo 4 de junio de 00:00 a 06:00.",
    },
];

export default function Dashboard() {
    return (
        <div className="container mt-4">
            <h2 className="mb-4">Dashboard</h2>

            {/* Totales: 3 columnas */}
            <div className="row mb-4">
                {totales.map(({ label, value, color, prefix }, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <div className={`card text-bg-${color}`}>
                            <div className="card-body">
                                <h5 className="card-title">{label}</h5>
                                <p className="card-text fs-4">{prefix || ""}{value.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Gráficos tipo dona por sucursal */}
            <div className="col-md-12 mb-4">
                <div className="card h-100">
                    <div className="card-header">Distribución por sucursal</div>
                    <div className="card-body">
                        <div className="row">
                            {dataSucursales.map((sucursal, idx) => (
                                <div
                                    key={idx}
                                    className="col-12 col-sm-6 col-md-4 d-flex flex-column align-items-center mb-3"
                                >
                                    <h6 className="text-center">{sucursal.nombre}</h6>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <PieChart>
                                            <Pie
                                                data={[
                                                    { name: "Participación", value: sucursal.porcentaje },
                                                    { name: "Resto", value: 100 - sucursal.porcentaje },
                                                ]}
                                                dataKey="value"
                                                outerRadius={70}
                                                innerRadius={40}
                                                startAngle={90}
                                                endAngle={-270}
                                            >
                                                <Cell fill={coloresSucursal[idx]} />
                                                <Cell fill="#e9ecef" />
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <span className="fw-bold mt-2">{sucursal.porcentaje}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>



            {/* Ventas por hora y Noticias */}
            <div className="row">
                {/* Ventas por hora */}
                <div className="col-md-8 mb-4">
                    <div className="card">
                        <div className="card-header">Ventas por hora</div>
                        <div className="card-body" style={{ height: "300px" }}>
                            <ResponsiveContainer>
                                <BarChart data={ventasPorHora}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="hora" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="ventas" fill="#0d6efd" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Noticias */}
                <div className="col-md-4">
                    <div className="card text-bg-light mb-4">
                        <div className="card-header">Noticias</div>
                        <div className="card-body">
                            {noticias.map((noticia, i) => (
                                <div key={i} className="mb-3 border-bottom pb-2">
                                    <small className="text-muted">{noticia.fecha}</small>
                                    <h6 className="mt-1 mb-1">{noticia.titulo}</h6>
                                    <p className="mb-0 text-secondary">{noticia.contenido}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
