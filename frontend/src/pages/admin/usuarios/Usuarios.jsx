import { Badge, Container, Pagination, Table } from 'react-bootstrap';
import { Github } from 'react-bootstrap-icons';

import './Usuarios.css';

const usuariosMock = [
  {
    id: 1,
    nombre: 'Alejandro',
    apellidos: 'García Martínez',
    email: 'alejandro.garcia@example.com',
    githubId: true,
    fechaNacimiento: '14/03/1995',
    telefono: '600123456',
  },
  {
    id: 2,
    nombre: 'María Carmen',
    apellidos: 'Rodríguez López',
    email: 'mamen.rod@example.com',
    githubId: false,
    fechaNacimiento: '22/11/1988',
    telefono: null,
  },
  {
    id: 3,
    nombre: 'David',
    apellidos: 'Sánchez Fernández',
    email: null,
    githubId: true,
    fechaNacimiento: '05/08/2001',
    telefono: '611987654',
  },
  {
    id: 4,
    nombre: 'Lucía',
    apellidos: 'Gómez Pérez',
    email: 'lucia.gomez@example.com',
    githubId: false,
    fechaNacimiento: '30/01/1993',
    telefono: '655443322',
  },
  {
    id: 5,
    nombre: 'Sergio',
    apellidos: 'González Ruiz',
    email: 'sergio.gonz@example.com',
    githubId: true,
    fechaNacimiento: '17/05/1997',
    telefono: null,
  },
  {
    id: 6,
    nombre: 'Elena',
    apellidos: 'Navarro Silva',
    email: null,
    githubId: true,
    fechaNacimiento: '12/10/2000',
    telefono: null,
  },
  {
    id: 7,
    nombre: 'Carlos',
    apellidos: 'Castro Romero',
    email: 'carlos.castro@example.com',
    githubId: false,
    fechaNacimiento: '25/07/1985',
    telefono: '622334455',
  },
  {
    id: 8,
    nombre: 'Sofía',
    apellidos: 'Rubio Blanco',
    email: 'sofia.rubio@example.com',
    githubId: true,
    fechaNacimiento: '09/02/2004',
    telefono: '677889900',
  },
  {
    id: 9,
    nombre: 'Javier',
    apellidos: 'Marín Díaz',
    email: 'javier.marin@example.com',
    githubId: false,
    fechaNacimiento: '18/06/1991',
    telefono: null,
  },
  {
    id: 10,
    nombre: 'Paula',
    apellidos: 'Alonso Torres',
    email: 'paula.alonso@example.com',
    githubId: false,
    fechaNacimiento: '03/12/1998',
    telefono: '688554433',
  },
];

function Usuarios() {
  return (
    <Container className="usuarios" fluid>
      <div className="mb-4">
        <h2 className="mb-2">Usuarios</h2>
        <p className="text-muted m-0">Gestiona los usuarios registrados.</p>
      </div>

      {/* Se puede usar size sm si es muy grande */}
      <Table striped hover responsive className="usuarios-table align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre completo</th>
            <th>Email</th>
            <th className="text-center align-middle">
              <Github className="me-2" title="Enlazado con GitHub" />
              <span>GitHub</span>
            </th>
            <th>Fecha Nacimiento</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {usuariosMock.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{`${usuario.nombre} ${usuario.apellidos}`}</td>
              <td>{usuario.email || <span className="text-muted">-</span>}</td>
              <td className="text-center">
                {usuario.githubId ? (
                  <Badge className="badge bg-success">Sí</Badge>
                ) : (
                  <Badge className="badge bg-secondary">No</Badge>
                )}
              </td>
              <td>{usuario.fechaNacimiento}</td>
              <td>
                {usuario.telefono || <span className="text-muted">-</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* TODO: Crear componente Paginador para reusar en todo el frontend */}
      <Pagination className="usuarios-pagination mt-4">
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Ellipsis />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </Container>
  );
}

export default Usuarios;
