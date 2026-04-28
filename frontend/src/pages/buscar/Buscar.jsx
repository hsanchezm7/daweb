import { Col, Container, Row } from 'react-bootstrap';

import Filtro from '../../components/filtro/Filtro';
import GridProductos from '../../components/grid-productos/GridProductos';
import './Buscar.css';

function Buscar() {
  return (
    <Container className="py-5 mt-0">
      <Row className="g-5">
        <Col xs={12} lg={3} className="mt-4 mt-lg-5">
          <Filtro />
        </Col>
        <Col xs={12} lg={9}>
          <GridProductos className="mt-lg-5" />
        </Col>
      </Row>
    </Container>
  );
}

export default Buscar;
