import { Container, Nav } from 'react-bootstrap';

import './Footer.css';

function Footer() {
  return (
    <Container>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-body-secondary">
          &copy; {new Date().getFullYear()} Daweb. Todos los derechos reservados
        </p>

        <a
          href="/"
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          aria-label="Bootstrap"
        >
          <svg className="bi me-2" width="40" height="32" aria-hidden="true">
            <use xlinkHref="#bootstrap"></use>
          </svg>
        </a>

        {/* Quitamos la clase "nav" porque el componente ya la pone */}
        <Nav className="col-md-4 justify-content-end">
          <Nav.Item>
            <Nav.Link href="/" className="px-2 text-body-secondary">
              Inicio
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/faqs" className="px-2 text-body-secondary">
              FAQs
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/about" className="px-2 text-body-secondary">
              Acerca de
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </footer>
    </Container>
  );
}

export default Footer;
