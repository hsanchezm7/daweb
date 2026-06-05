import { Col, Container, Row } from 'react-bootstrap';

import './GridProductos.css';
import CardProducto from '@/components/card-producto/CardProducto';

function GridProductos({
  className = '',
  nuevoProductoCard = null,
  productos = [],
  tipoCard ='',
}) {
  return (
    <Container fluid className={className}>
      <Row xs={1} sm={1} md={2} lg={2} xl={3} xxl={4} className="g-4">
        {nuevoProductoCard ? (
          <Col key="lead-card">{nuevoProductoCard}</Col>
        ) : null}
        {productos.length === 0 && !nuevoProductoCard && (
          <Col xs={12} className="text-center py-5 w-100">
            <h5 className="text-muted fw-normal">
              No se encontraron productos.
            </h5>
          </Col>
        )}
        {productos.map((producto) => {
          return <Col key={producto.id} >
            <CardProducto producto={producto} tipoCard={tipoCard} />
          </Col>;
        })}
      </Row>
    </Container>
  );
}

export default GridProductos;
