import { Accordion, Button, Col, Form, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

import './Filtro.css';

function Filtro({
  opcionesCategoria = [],
  opcionesEstado = {},
  filtros = {},
  onFiltroChange,
}) {
  const { categoriaId = '', estado = '' } = filtros;

  return (
    <div className="filtro p-3 d-flex flex-column gap-4">
      {/* TODO: lógica de botones */}
      <div className="d-flex gap-2 align-self-center">
        <Button variant="outline-dark" className="py-2 px-4 text-nowrap">
          <span className="small">Limpiar filtros</span>
        </Button>
      </div>

      <Row className="justify-content-center m-0">
        <Col xs={12} md={9} lg={12} className="px-2 w-100">
          <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Precio</Accordion.Header>
              <Accordion.Body>
                <Form.Label className="text-muted">
                  Ajusta el rango de precios
                </Form.Label>
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
                <Form.Label className="text-muted">
                  Selecciona el estado mínimo del producto
                </Form.Label>
                <Form.Select
                  aria-label="Filtro de estado"
                  value={estado}
                  onChange={(e) =>
                    onFiltroChange && onFiltroChange('estado', e.target.value)
                  }
                >
                  <option value="">Cualquier estado</option>
                  {Object.entries(opcionesEstado).map(([key, value]) => {
                    return (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    );
                  })}
                </Form.Select>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Categoría</Accordion.Header>
              <Accordion.Body>
                <Form.Label className="text-muted">
                  Selecciona la categoría del producto
                </Form.Label>
                <Typeahead
                  id="filtro-categoria-typeahead"
                  labelKey="nombre"
                  onChange={(selected) => {
                    if (selected.length > 0) {
                      onFiltroChange &&
                        onFiltroChange('categoriaId', selected[0].id);
                    } else {
                      onFiltroChange && onFiltroChange('categoriaId', '');
                    }
                  }}
                  options={opcionesCategoria}
                  placeholder="Selecciona una categoría..."
                  selected={opcionesCategoria.filter(
                    (c) => c.id === categoriaId
                  )}
                  clearButton
                  renderMenuItemChildren={(p) => (
                    <div>
                      {p.nombre}
                      <div className="text-muted">
                        <small>{p.descripcion}</small>
                      </div>
                    </div>
                  )}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </div>
  );
}

export default Filtro;
