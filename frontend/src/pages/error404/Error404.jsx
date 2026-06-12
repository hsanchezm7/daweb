import { Button, Container } from 'react-bootstrap';
import { HouseFill } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

import notFoundSvg from '@/assets/not_found.svg';
import useDocumentTitle from '@/hooks/useDocumentTitle';

import './Error404.css';

function Error404() {
  useDocumentTitle('Página no encontrada');

  const navigate = useNavigate();
  // TODO: que las paginas sean de la página. Eso, o implementar como en el login.
  const btnVolver = window.history.length > 1;

  return (
    <Container className="d-flex flex-column align-items-center text-center p-5">
      <img
        src={notFoundSvg}
        alt="Página no encontrada"
        className="w-100 mb-4"
        style={{ maxWidth: 620 }}
      />
      <h1 className="fs-2 fw-bold mt-3">Página no encontrada</h1>
      <p className="lead text-muted">
        No hemos podido encontrar la página que buscas.
      </p>
      <div className="d-flex gap-2 mt-2">
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

export default Error404;
