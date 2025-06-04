import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaUser, FaLock } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!username || !password) return;

        setLoading(true);

        setTimeout(() => {
            const ok = login(username, password);
            setLoading(false);

            if (!ok) {
                toast.error("Credenciales incorrectas");
            } else {
                toast.success("Bienvenido a Kinder ERP");
            }
        }, 1000);
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center min-vh-100"
            style={{
                background: "linear-gradient(135deg, #e0eafc, #cfdef3)",
            }}
        >
            <div
                className="card shadow p-4 animate__animated animate__fadeIn"
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    backgroundColor: "#ffffffdd",
                    backdropFilter: "blur(8px)",
                    borderRadius: "1rem",
                }}
            >
                {/* Logo */}
                <div className="text-center mb-3">
                    <img
                        src="/src/assets/logo.png" // Asegurate de tener este archivo en `public/logo.png`
                        alt="Kinder ERP"
                        style={{ height: "60px" }}
                    />
                </div>

                <h4 className="mb-4 text-center">Iniciar sesión</h4>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Usuario</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaUser />
                            </span>
                            <input
                                id="username"
                                type="text"
                                className={`form-control ${submitted && !username ? "is-invalid" : ""
                                    }`}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            {submitted && !username && (
                                <div className="invalid-feedback">El usuario es requerido</div>
                            )}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaLock />
                            </span>
                            <input
                                id="password"
                                type="password"
                                className={`form-control ${submitted && !password ? "is-invalid" : ""
                                    }`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {submitted && !password && (
                                <div className="invalid-feedback">La contraseña es requerida</div>
                            )}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? (
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        ) : null}
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
}
