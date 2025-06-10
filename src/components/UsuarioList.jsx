import React, { useEffect, useState } from 'react';
import { fetchUsuarios } from '../services/usuarioService';
import * as FaIcons from "react-icons/fa";

export default function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // filas por página
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await fetchUsuarios();
        setUsuarios(data);         // data es un array
        setTotal(data.length);     // total usuarios es la longitud del array
      } catch (error) {
        console.error(error);
        setUsuarios([]);
        setTotal(0);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  // Función para manejar la modificación del usuario
  function handleModificar(usuario) {
    console.log('Modificar usuario:', usuario);
    // Aquí puedes abrir un modal o navegar a la página de edición
  }

  // Función para cambiar el estado (bloquear o eliminar)
  function handleCambiarEstado(usuario) {
    console.log('Cambiar estado usuario:', usuario);
    // Aquí puedes llamar al servicio para actualizar el estado del usuario
  }

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setPage(1); // resetear página al buscar
  }

  return (
    <div className="container mt-4">
      <h2>Lista usuarios</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre o usuario"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Nombre Completo</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Acciones</th> {/* Nueva columna para botones */}
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">No se encontraron usuarios</td>
                </tr>
              ) : (
                usuarios.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{`${u.nombres} ${u.primer_apellido} ${u.segundo_apellido}`}</td>
                    <td>{u.telefono}</td>
                    <td>{u.estado?.nombre || ''}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleModificar(u)}
                        title="Modificar usuario"
                      >
                        <FaIcons.FaEdit />
                      </button>
                      <button
                        className={`btn btn-sm ${u.estado?.nombre === 'Activo' ? 'btn-danger' : 'btn-success'}`}
                        onClick={() => handleCambiarEstado(u)}
                        title={u.estado?.nombre === 'Activo' ? 'Bloquear usuario' : 'Activar usuario'}
                      >
                        {u.estado?.nombre === 'Activo' ? <FaIcons.FaLock /> : <FaIcons.FaLockOpen />}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Paginación */}
          <nav>
            <ul className="pagination">
              <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage(page - 1)} disabled={page === 1}>
                  Anterior
                </button>
              </li>

              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${page === i + 1 ? 'active' : ''}`}
                >
                  <button className="page-link" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
}
