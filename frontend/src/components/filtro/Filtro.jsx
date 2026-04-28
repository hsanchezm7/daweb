import { Accordion, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Filtro.css';

function Filtro() {
  return (
    <Container className="d-flex flex-column gap-4" fluid>
      {/* TODO: lógica de botones */}
      <div className="d-flex gap-2 align-self-center">
        <Button variant="primary" className="d-lg-none py-2 px-4 text-nowrap">
          <span className="small">Mostrar/Ocultar filtros</span>
        </Button>
        <Button variant="outline-dark" className="py-2 px-4 text-nowrap">
          <span className="small">Limpiar filtros</span>
        </Button>
      </div>

      <Row className="justify-content-center m-0">
        <Col xs={12} md={9} lg={12} className="p-0">
          <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Precio</Accordion.Header>
              <Accordion.Body>
                <Form.Label>Ajusta el rango de precios</Form.Label>
                <div className="d-flex gap-3 align-items-center">
                  {/* TODO: ajustar valores min y max de productos de forma dinámica.
              Pedir a la API, para el filtro, el precio min y máximo */}
                  <span className="small text-nowrap">Mín €</span>
                  <Form.Range className="flex-grow-1" />
                  <span className="small text-nowrap">Máx €</span>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Estado</Accordion.Header>
              <Accordion.Body>
                <Form.Label>
                  Selecciona el estado mínimo del producto
                </Form.Label>
                <Form.Select aria-label="Default select example">
                  <option>Selecciona un estado</option>
                  <option value="1">A estrenar</option>
                  <option value="2">Como nuevo</option>
                  <option value="3">Buen estado</option>
                  <option value="4">Aceptable</option>
                  <option value="5">Para piezas</option>
                </Form.Select>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Categoría</Accordion.Header>
              <Accordion.Body>
                <Form.Label>Selecciona la categoría del producto</Form.Label>
                <Form.Check
                  type="radio"
                  id="categoria-1"
                  name="categoria"
                  label="Categoría 1"
                />
                <Form.Check
                  type="radio"
                  id="categoria-2"
                  name="categoria"
                  label="Categoría 2"
                />
                <Form.Check
                  type="radio"
                  id="categoria-3"
                  name="categoria"
                  label="Categoría 3"
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default Filtro;
