import { Container, Pagination, Table } from 'react-bootstrap';

import './Compraventas.css';

const comprasMock = [
  {
    id: 1,
    titulo: 'Bicicleta de Montaña',
    idProducto: 'PROD-101',
    vendedor: 'Juan Pérez',
    comprador: 'Carlos Ruiz',
    fecha: '18/05/2026',
    precio: '150,00 €',
  },
  {
    id: 2,
    titulo: 'Laptop Dell XPS 13',
    idProducto: 'PROD-205',
    vendedor: 'Ana Gómez',
    comprador: 'María López',
    fecha: '19/05/2026',
    precio: '1.200,00 €',
  },
  {
    id: 3,
    titulo: 'Libro "Aprende React"',
    idProducto: 'PROD-042',
    vendedor: 'Luis Martínez',
    comprador: 'Sofía Castro',
    fecha: '20/05/2026',
    precio: '35,00 €',
  },
  {
    id: 4,
    titulo: 'iPhone 13 Pro 256GB',
    idProducto: 'PROD-311',
    vendedor: 'Laura Sánchez',
    comprador: 'David Gil',
    fecha: '20/05/2026',
    precio: '650,00 €',
  },
  {
    id: 5,
    titulo: 'Monitor LG UltraGear 27"',
    idProducto: 'PROD-198',
    vendedor: 'Carlos Ruiz',
    comprador: 'Elena Navarro',
    fecha: '21/05/2026',
    precio: '280,00 €',
  },
  {
    id: 6,
    titulo: 'Teclado Mecánico Keychron',
    idProducto: 'PROD-112',
    vendedor: 'Marta Díaz',
    comprador: 'Juan Pérez',
    fecha: '22/05/2026',
    precio: '95,00 €',
  },
  {
    id: 7,
    titulo: 'Mesa de escritorio Ikea',
    idProducto: 'PROD-088',
    vendedor: 'Pedro Romero',
    comprador: 'Lucía Blanco',
    fecha: '22/05/2026',
    precio: '45,00 €',
  },
  {
    id: 8,
    titulo: 'Silla Ergonómica Herman Miller',
    idProducto: 'PROD-502',
    vendedor: 'Sofía Castro',
    comprador: 'Mario Vargas',
    fecha: '23/05/2026',
    precio: '450,00 €',
  },
  {
    id: 9,
    titulo: 'Auriculares Sony WH-1000XM4',
    idProducto: 'PROD-404',
    vendedor: 'David Gil',
    comprador: 'Ana Gómez',
    fecha: '24/05/2026',
    precio: '199,00 €',
  },
  {
    id: 10,
    titulo: 'Cámara Canon EOS R50',
    idProducto: 'PROD-610',
    vendedor: 'Elena Navarro',
    comprador: 'Luis Martínez',
    fecha: '24/05/2026',
    precio: '750,00 €',
  },
];

function Compraventas() {
  return (
    <Container className="compraventas" fluid>
      <div className="mb-4">
        <h2 className="mb-2">Compraventas</h2>
        <p className="text-muted m-0">
          Consultas las compraventas realizadas en la aplicación.
        </p>
      </div>

      {/* Se puede usar size sm si es muy grande */}
      <Table striped hover responsive className="compraventas-table align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>ID Producto</th>
            <th>Nombre Vendedor</th>
            <th>Nombre Comprador</th>
            <th>Fecha</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {comprasMock.map((compra) => (
            <tr key={compra.id}>
              <td>{compra.id}</td>
              <td>{compra.titulo}</td>
              <td>{compra.idProducto}</td>
              <td>{compra.vendedor}</td>
              <td>{compra.comprador}</td>
              <td>{compra.fecha}</td>
              <td>{compra.precio}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* TODO: Crear componente Paginador para reusar en todo el frontend */}
      <Pagination className="compraventas-pagination mt-4">
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

export default Compraventas;
