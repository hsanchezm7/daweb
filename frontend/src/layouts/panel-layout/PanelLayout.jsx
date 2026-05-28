import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Menu from '../../components/menu/Menu';
import './PanelLayout.css';

function PanelLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header></Header>
      <main className="main-content flex-grow-1">
        <Container className="panel-body py-5 mt-0" >
          <Row className="g-5 panel-sidebar">
            <Col
              xs={12}
              lg="auto"
              className="mt-4 mt-lg-5 pe-lg-4 panel-sidebar-divider"
            >
              <Menu />
            </Col>
            <Col xs={12} lg>
              <div className="panel-content p-3">
                <Outlet />
              </div>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default PanelLayout;
