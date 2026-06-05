import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './CardProducto.css';

export const TIPO_CARD = {
  MIS_PRODUCTOS: 'MIS_PRODUCTOS',
  BUSCAR: 'BUSCAR',
};

function CardProducto({
  producto,
  tipoCard = TIPO_CARD.BUSCAR,
  es_popular = false,
}) {
  const imagenMostrar =
    producto.urlImagen || 'https://placehold.co/600x400/000000/FFF';
  const descripcionMostrar =
    producto.descripcion || 'Descripción no disponible por el momento.';

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
    <div key={producto.id} className="card-3d-wrapper">
      <Card
        className="h-100 rounded-5 overflow-hidden card-producto shadow-sm"
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
      >
        <div className="top-left-icons">
          {tipoCard === TIPO_CARD.MIS_PRODUCTOS && (
            <div className="card-icon icon-views">
              <i className="bi bi-eye"></i> {producto.visualizaciones}
            </div>
          )}
        </div>
        
        <div className="top-right-icons">
          {es_popular && (
            <OverlayTrigger
              key="popular"
              placement="top"
              overlay={<Tooltip id="tooltip-popular">{`${producto.visualizaciones} visualizaciones`}</Tooltip>}
            >
              <div className="card-icon icon-fire">
                <i className="bi bi-fire"></i>
              </div>
            </OverlayTrigger>
          )}

          {producto.envioDisponible && (
            <OverlayTrigger
              key="envio"
              placement="top"
              overlay={
                <Tooltip id="tooltip-envio">Envío disponible</Tooltip>
              }
            >
              <div className="card-icon">
                <FontAwesomeIcon icon={faTruckFast} />
              </div>
            </OverlayTrigger>
          )}
        </div>

        {/* TODO: badge con el estado del producto */}
        <Card.Img
          variant="top"
          src={imagenMostrar}
          alt={producto.titulo}
          className="rounded-top-5"
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{producto.titulo}</Card.Title>
          <Card.Text className="text-muted">{descripcionMostrar}</Card.Text>

          <div className="mt-auto">
            <h6 className="fw-bold mb-3">{producto.precio} €</h6>
            <Button
              variant="primary"
              className="w-100 btn-dynamic-hover"
              onMouseMove={handleMouseMove}
              onClick={() => navigate(`/producto/${producto.id}`)}
            >
              {tipoCard === TIPO_CARD.MIS_PRODUCTOS
                ? 'Ver detalles'
                : 'Comprar ahora'}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardProducto;
