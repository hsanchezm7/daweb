import { Col, Container, Row } from 'react-bootstrap';

import useDocumentTitle from '@/hooks/useDocumentTitle';

import Filtro from '../../components/filtro/Filtro';
import GridProductos from '../../components/grid-productos/GridProductos';
import './Buscar.css';

function Buscar() {
  useDocumentTitle('Buscar');
  return (
    <Container className="py-5 mt-0 buscar-body">
      <Row className="g-5">
        <Col xs={12} lg={3} className="mt-4 mt-lg-5">
          <Filtro />
        </Col>
        <Col xs={12} lg className="buscar-content p-3">
          {/* TODO: sustituir la query de búsqueda en el texto */}
          <h2 className="pb-3 mb-5 border-bottom">
            128 resultados para "query"
          </h2>
          <GridProductos className="mt-lg-5" />
        </Col>
      </Row>
    </Container>
  );
}

export default Buscar;
