import { Button, Container } from 'react-bootstrap';
import { HouseFill } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

import unauthorizedSvg from '@/assets/unauthorized.svg';
import useDocumentTitle from '@/hooks/useDocumentTitle';

function Unauthorized() {
  useDocumentTitle('Sin autorización');

  const navigate = useNavigate();
  const btnVolver = window.history.length > 1;

  return (
    <Container className="d-flex flex-column align-items-center text-center p-5">
      <img
        src={unauthorizedSvg}
        alt="Sin autorización"
        className="w-100 mb-4"
        style={{ maxWidth: 420 }}
      />
      <h1 className="fs-2 fw-bold mt-3">Acceso no autorizado</h1>
      <p className="lead text-muted">
        No tienes permiso para acceder a esta página.
      </p>
      <div className="d-flex gap-2 mt-2">
        {/* restamos 2 para que no vuelva a navegar a la ruta sin autorización */}
        {btnVolver && (
          <Button variant="outline-dark" onClick={() => navigate(-2)}>
            Volver
          </Button>
        )}
        <Button variant="dark" as={Link} to="/">
          <HouseFill className="me-2" aria-hidden="true" />
          Ir a Inicio
        </Button>
      </div>
    </Container>
  );
}

export default Unauthorized;
