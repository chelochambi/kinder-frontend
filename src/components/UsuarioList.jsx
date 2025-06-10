import React, { useEffect, useState } from 'react';
import { fetchUsuarios } from '../services/usuarioService';
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Spinner,
  Card,
  Button,
  ButtonGroup,
  Pagination,
  Badge,
} from 'react-bootstrap';
import { FaEdit, FaLock, FaLockOpen, FaPlus } from 'react-icons/fa';

export default function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await fetchUsuarios();
        const filtered = data.filter(u =>
          u.username.toLowerCase().includes(search.toLowerCase()) ||
          `${u.nombres} ${u.primer_apellido} ${u.segundo_apellido}`.toLowerCase().includes(search.toLowerCase())
        );
        setTotal(filtered.length);
        const start = (page - 1) * limit;
        const paginated = filtered.slice(start, start + limit);
        setUsuarios(paginated);
      } catch (error) {
        console.error(error);
        setUsuarios([]);
        setTotal(0);
      }
      setLoading(false);
    }

    loadData();
  }, [page, limit, search]);

  const handleModificar = usuario => {
    console.log('Modificar usuario:', usuario);
  };

  const handleCambiarEstado = usuario => {
    console.log('Cambiar estado usuario:', usuario);
  };

  const handleCrearUsuario = () => {
    console.log('Crear nuevo usuario');
  };

  const handleSearchChange = e => {
    setSearch(e.target.value);
    setPage(1);
  };

  const renderEstadoBadge = estado => {
    if (!estado) return null;

    let variant = 'secondary';
    if (estado.nombre === 'Activo') variant = 'success';
    else if (estado.nombre === 'Bloqueado') variant = 'warning';
    else if (estado.nombre === 'Bloqueado aut') variant = 'warning';

    return <Badge bg={variant}>{estado.nombre}</Badge>;
  };

  const renderPagination = () => (
    <Pagination className="justify-content-center mt-3">
      <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
      {[...Array(totalPages)].map((_, i) => (
        <Pagination.Item key={i + 1} active={page === i + 1} onClick={() => setPage(i + 1)}>
          {i + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
    </Pagination>
  );

  return (
    <Container className="mt-4">
      <Row className="mb-3 align-items-center">
        <Col>
          <h3 className="text-primary">Gestión de Usuarios</h3>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={handleCrearUsuario}>
            <FaPlus className="me-2" />
            Crear Usuario
          </Button>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre o usuario"
                value={search}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>

          {loading ? (
            <div className="text-center my-4">
              <Spinner animation="border" role="status" />
              <p className="mt-2">Cargando usuarios...</p>
            </div>
          ) : (
            <>
              <Table responsive striped bordered hover>
                <thead className="table-primary">
                  <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Nombre Completo</th>
                    <th>Teléfono</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No se encontraron usuarios
                      </td>
                    </tr>
                  ) : (
                    usuarios.map(u => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>{`${u.nombres} ${u.primer_apellido} ${u.segundo_apellido}`}</td>
                        <td>{u.telefono}</td>
                        <td>{renderEstadoBadge(u.estado)}</td>
                        <td>
                          <ButtonGroup size="sm">
                            <Button variant="primary" onClick={() => handleModificar(u)} title="Modificar usuario">
                              <FaEdit />
                            </Button>
                            <Button
                              variant={u.estado?.nombre === 'Activo' ? 'danger' : 'success'}
                              onClick={() => handleCambiarEstado(u)}
                              title={u.estado?.nombre === 'Activo' ? 'Bloquear usuario' : 'Activar usuario'}
                            >
                              {u.estado?.nombre === 'Activo' ? <FaLock /> : <FaLockOpen />}
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
              {renderPagination()}
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
