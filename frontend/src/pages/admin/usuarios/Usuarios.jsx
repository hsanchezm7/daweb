import { useEffect, useState } from 'react';
import { Alert, Badge, Container, Table } from 'react-bootstrap';
import { Github } from 'react-bootstrap-icons';

import { formatDateFromBackend } from '@/config/datepicker';
import useApiPrivate from '@/hooks/useApiPrivate';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import createUserService from '@/services/userService';

import './Usuarios.css';

function Usuarios() {
  useDocumentTitle('Usuarios');

  const apiPrivate = useApiPrivate();
  const userService = createUserService(apiPrivate);

  const [usuarios, setUsuarios] = useState([]);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    const loadUsuarios = async () => {
      try {
        const data = await userService.getUsers();
        // tratar HATEOAS
        const usuarios = (data.usuario || []).map((u) => u.resumen);
        setUsuarios(usuarios);
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        setErrMsg('Error al cargar los usuarios');
      }
    };

    loadUsuarios();
  }, []);

  return (
    <Container className="usuarios" fluid>
      <div className="mb-5">
        <h2 className="mb-2">Usuarios</h2>
        <p className="text-muted m-0">Gestiona los usuarios registrados.</p>
      </div>
      {/* el flujo es el siguiente: si hay un error (errMsg), sólo mostrar el error. si no: si no hay usuarios,
      mostrar una única fila No Data. Si los hay, mostrar la lista de usuarios */}
      {errMsg ? (
        <Alert variant="danger">{errMsg}</Alert>
      ) : (
        <Table striped hover responsive className="usuarios-table align-middle" size='sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre completo</th>
              <th>Email</th>
              <th className="text-center align-middle">
                <Github className="me-2" title="Enlazado con GitHub" />
                <span>GitHub</span>
              </th>
              <th>Fecha de nacimiento</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombreCompleto}</td>
                  <td>
                    {usuario.email || <span className="text-muted">-</span>}
                  </td>
                  <td className="text-center">
                    {usuario.githubId ? (
                      <Badge className="badge bg-success">Sí</Badge>
                    ) : (
                      <Badge className="badge bg-secondary">No</Badge>
                    )}
                  </td>
                  <td>
                    {usuario.fechaNacimiento ? (
                      formatDateFromBackend(usuario.fechaNacimiento)
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>
                  <td>
                    {usuario.telefono || <span className="text-muted">-</span>}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  Sin datos.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Usuarios;
