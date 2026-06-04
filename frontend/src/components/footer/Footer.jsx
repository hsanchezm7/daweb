import { Container, Nav } from 'react-bootstrap';

import swapitLogo from '@/assets/swapit-logo.svg';

import './Footer.css';

function Footer() {
  return (
    <Container>
      <footer className="d-flex flex-column flex-md-row justify-content-between align-items-center py-3 my-2 border-top w-100 gap-3 gap-md-0">
        <div className="col-md-4 d-flex justify-content-center justify-content-md-start align-items-center">
          <span className="mb-0 text-center text-md-start text-body-secondary lh-1">
            &copy; {new Date().getFullYear()} swapIt. Todos los derechos reservados
          </span>
        </div>

        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <a
            href="/"
            className="link-body-emphasis text-decoration-none d-flex align-items-center justify-content-center"
            style={{ height: '48px' }}
          >
            <img src={swapitLogo} alt="swapIt Logo" height="48" className="d-block" />
          </a>
        </div>

        <Nav className="col-md-4 justify-content-center justify-content-md-end align-items-center">
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
