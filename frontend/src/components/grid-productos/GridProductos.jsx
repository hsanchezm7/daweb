import {
  Button,
  Card,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './GridProductos.css';

export const VISTAS_GRID = {
  MIS_PRODUCTOS: 'MIS_PRODUCTOS',
  BUSCAR: 'BUSCAR',
};

function GridProductos({
  className = '',
  nuevoProductoCard = null,
  productos = [],
  vista = VISTAS_GRID.BUSCAR, // por defecto
}) {
  const navigate = useNavigate();

  // efecto del botón
  const handleMouseMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty('--x', `${x}px`);
    btn.style.setProperty('--y', `${y}px`);
  };

  // https://www.frontend.fyi/tutorials/css-3d-perspective-animations
  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercentage = x / rect.width;
    const yPercentage = y / rect.height;
    const xRotation = (xPercentage - 0.5) * 20;
    const yRotation = (0.5 - yPercentage) * 20;

    e.currentTarget.style.setProperty('--x-rotation', `${yRotation}deg`);
    e.currentTarget.style.setProperty('--y-rotation', `${xRotation}deg`);
    e.currentTarget.style.setProperty('--card-x', `${xPercentage * 100}%`);
    e.currentTarget.style.setProperty('--card-y', `${yPercentage * 100}%`);
  };

  const handleCardMouseLeave = (ev) => {
    ev.currentTarget.style.setProperty('--x-rotation', `0deg`);
    ev.currentTarget.style.setProperty('--y-rotation', `0deg`);
  };

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
          const imagenMostrar =
            producto.imagen || 'https://placehold.co/600x400/000000/FFF';
          const descripcionMostrar =
            producto.descripcion || 'Descripción no disponible por el momento.';

          return (
            <Col key={producto.id} className="card-3d-wrapper">
              <Card
                className="h-100 rounded-5 overflow-hidden card-producto shadow-sm"
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
              >
                {/* overlay trigger junto a tooltip para mostrar texto de envío disponible al pasar por encima */}
                <OverlayTrigger
                  key="top"
                  placement="top"
                  overlay={<Tooltip id="tooltip-top">Envío disponible</Tooltip>}
                >
                  <div className="card-icon">
                    <FontAwesomeIcon icon={faTruckFast} />
                  </div>
                </OverlayTrigger>

                {/* TODO: badge con el estado del producto */}
                <Card.Img
                  variant="top"
                  src={imagenMostrar}
                  alt={producto.titulo}
                  className="rounded-top-5"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{producto.titulo}</Card.Title>
                  <Card.Text className="text-muted">
                    {descripcionMostrar}
                  </Card.Text>

                  <div className="mt-auto">
                    <h6 className="fw-bold mb-3">{producto.precio} €</h6>
                    <Button
                      variant="primary"
                      className="w-100 btn-dynamic-hover"
                      onMouseMove={handleMouseMove}
                      onClick={() => navigate(`/producto/${producto.id}`)}
                    >
                      {vista === VISTAS_GRID.MIS_PRODUCTOS
                        ? 'Ver detalles'
                        : 'Comprar ahora'}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default GridProductos;
