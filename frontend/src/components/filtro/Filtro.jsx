import { Accordion, Button, Col, Form, Row } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

import './Filtro.css';

function Filtro({
  opcionesCategoria = [],
  opcionesEstado = {},
  opcionesRangoPrecios = { min: 0, max: 0 },
  filtros = {},
  onFiltroChange,
  onClearFiltros,
}) {
  const {
    categoriaId = '',
    estado = '',
    descripcion = '',
    precioMaximo = '',
  } = filtros;
  const minPrecio = Math.floor(opcionesRangoPrecios?.min || 0);
  const maxPrecio = Math.ceil(opcionesRangoPrecios?.max || 1000);
  const valorActual = precioMaximo !== '' ? precioMaximo : maxPrecio;

  return (
    <div className="filtro p-3 d-flex flex-column gap-4">
      <div className="d-flex gap-2 align-self-center">
        <Button
          variant="outline-dark"
          className="py-2 px-4 text-nowrap"
          onClick={onClearFiltros}
        >
          <span className="small">Limpiar filtros</span>
        </Button>
      </div>

      <Row className="justify-content-center m-0">
        <Col xs={12} md={9} lg={12} className="px-2 w-100">
          <Accordion defaultActiveKey={['0', '1', '2', '3']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Precio</Accordion.Header>
              <Accordion.Body>
                <Form.Label className="text-muted">
                  Ajusta el rango de precios
                </Form.Label>
                <div className="d-flex gap-3 align-items-center">
                  <span className="small text-nowrap">{minPrecio} €</span>
                  <Form.Range
                    className="flex-grow-1"
                    min={minPrecio}
                    max={maxPrecio}
                    value={valorActual}
                    onChange={(e) =>
                      onFiltroChange &&
                      onFiltroChange('precioMaximo', e.target.value)
                    }
                  />
                  <span className="small text-nowrap">{valorActual} €</span>
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
            <Accordion.Item eventKey="3">
              <Accordion.Header>Descripción</Accordion.Header>
              <Accordion.Body>
                <Form.Label className="text-muted">
                  Indica la descripción del producto
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={(e) =>
                    onFiltroChange &&
                    onFiltroChange('descripcion', e.target.value)
                  }
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
