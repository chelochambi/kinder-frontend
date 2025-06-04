import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ username: false, password: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Debe completar todos los campos");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const ok = login(username, password);
      setLoading(false);
      if (!ok) {
        toast.error("Credenciales incorrectas");
      } else {
        toast.success("Bienvenido");
      }
    }, 1000);
  };

  const inputClass = (field) =>
    touched[field] && !eval(field)
      ? "form-control is-invalid"
      : "form-control";

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #e0eafc, #cfdef3)",
      }}
    >
      <div className="bg-white p-4 rounded shadow" style={{ width: "100%", maxWidth: "400px" }}>
        {/* Logo */}
        <div className="text-center mb-4">
          <img
            src="/logo192.png"
            alt="Logo"
            style={{ width: "60px", marginBottom: "10px" }}
          />
          <h4 className="mb-0">Kinder ERP</h4>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label>Usuario</label>
            <input
              type="text"
              className={inputClass("username")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, username: true }))}
              required
            />
            {touched.username && !username && (
              <div className="invalid-feedback">Ingrese su usuario</div>
            )}
          </div>

          <div className="mb-4">
            <label>Contraseña</label>
            <input
              type="password"
              className={inputClass("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              required
            />
            {touched.password && !password && (
              <div className="invalid-feedback">Ingrese su contraseña</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Ingresando...
              </>
            ) : (
              "Ingresar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
