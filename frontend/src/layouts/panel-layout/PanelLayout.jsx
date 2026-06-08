import { useEffect, useState } from 'react';
import { Col, Container, Offcanvas, Row } from 'react-bootstrap';
import { Outlet, useLocation } from 'react-router-dom';

import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Menu from '../../components/menu/Menu';
import './PanelLayout.css';

function PanelLayout() {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const handleClose = () => setShowMenu(false);
  const handleShow = () => setShowMenu(true);

  // ponemos el location como dependencia para cerrar el offcanvas
  // si cambia la ruta
  useEffect(() => {
    handleClose();
  }, [location.pathname]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onMenuToggle={handleShow}></Header>
      <main className="main-content flex-grow-1">
        <Container className="panel-body py-5 mt-0">
          <Row className="g-5 panel-sidebar">
            <Col
              xs={12}
              lg="auto"
              className="d-none d-lg-block mt-4 mt-lg-5 pe-lg-4 panel-sidebar-divider"
            >
              <Menu />
            </Col>
            <Col xs={12} lg={9}>
              <div className="panel-content p-3">
                <Outlet />
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer></Footer>

      {/* offcanvas lateral para pantallas pequenas */}
      <Offcanvas
        show={showMenu}
        onHide={handleClose}
        placement="start"
        className="d-lg-none p-3"
      >
        <Offcanvas.Header closeButton className="mt-1">
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-2">
          <Menu />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default PanelLayout;
