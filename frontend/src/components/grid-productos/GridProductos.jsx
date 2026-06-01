import {
  Button,
  Card,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';

import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './GridProductos.css';

function GridProductos({ className = '', nuevoProductoCard = null }) {
  const PRODUCTOS = [
    // muestra de productos (IA)
    {
      id: 'prod-1',
      nombre: 'Auriculares Inalámbricos',
      descripcion:
        'Sonido envolvente con cancelación de ruido activa y 30 horas de batería.',
      precio: 99.99,
      imagen: 'https://placehold.co/300x200',
    },
    {
      id: 'prod-2',
      nombre: 'Reloj Inteligente Fit',
      descripcion:
        'Monitor de ritmo cardíaco, GPS integrado y resistente al agua.',
      precio: 149.5,
      imagen: 'https://placehold.co/300x200',
    },
    {
      id: 'prod-3',
      nombre: 'Cámara de Acción 4K',
      descripcion:
        'Captura tus aventuras con máxima resolución y estabilización óptica.',
      precio: 259.0,
      imagen: 'https://placehold.co/300x200',
    },
    {
      id: 'prod-4',
      nombre: 'Mochila Urbana',
      descripcion:
        'Diseño ergonómico con compartimento acolchado para portátil de 15".',
      precio: 45.0,
      imagen: 'https://placehold.co/300x200',
    },
    {
      id: 'prod-5',
      nombre: 'Lector de Libros Electrónico',
      descripcion:
        'Pantalla de tinta electrónica de 6 pulgadas sin reflejos y batería de semanas de duración.',
      precio: 129.99,
      imagen: 'https://placehold.co/300x200',
    },
    {
      id: 'prod-6',
      nombre: 'Altavoz Bluetooth Impermeable',
      descripcion:
        'Sonido de alta fidelidad de 360 grados, resistente al agua, al polvo y a las caídas.',
      precio: 59.9,
      imagen: 'https://placehold.co/300x200',
    },
    {
      id: 'prod-7',
      nombre: 'Teclado Mecánico Inalámbrico',
      descripcion:
        'Switches táctiles silenciosos, retroiluminación RGB y conexión simultánea multidispositivo.',
      precio: 85.5,
      imagen: 'https://placehold.co/300x200',
    },
    {
      id: 'prod-8',
      nombre: 'Batería Externa 20000mAh',
      descripcion:
        'Carga rápida inteligente para hasta tres dispositivos simultáneamente. Diseño compacto.',
      precio: 29.99,
      imagen: 'https://placehold.co/300x200',
    },
  ];

  return (
    <Container fluid className={className}>
      <Row xs={1} sm={1} md={2} lg={2} xl={3} xxl={4} className="g-4">
        {nuevoProductoCard ? (
          <Col key="lead-card">{nuevoProductoCard}</Col>
        ) : null}
        {PRODUCTOS.map((producto) => (
          <Col key={producto.id}>
            <Card className="h-100 rounded-5 overflow-hidden shadow-sm">
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
                src={producto.imagen}
                alt={producto.nombre}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text className="text-muted">
                  {producto.descripcion}
                </Card.Text>

                <div className="mt-auto">
                  <h6 className="fw-bold mb-3">{producto.precio} €</h6>
                  <Button variant="primary" className="w-100">
                    Comprar ahora
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default GridProductos;
