import { Nav } from 'react-bootstrap';
import {
  BagCheckFill,
  BoxSeam,
  Grid,
  PeopleFill,
  PersonFill,
  Wallet2,
} from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

import './Menu.css';

function Menu() {
  return (
    <div className="menu p-3">
      {/* usuario */}
      <h6 className="menu-title">Usuario</h6>
      <Nav className="flex-column menu-list mb-4">
        <Nav.Item>
          <Nav.Link as={NavLink} to="/panel/mi-cuenta" className="menu-link">
            <PersonFill className="me-2" aria-hidden="true" />
            <span>Mi cuenta</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/panel/mis-compras" className="menu-link">
            <BagCheckFill className="me-2" aria-hidden="true" />
            <span>Mis compras</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/panel/mis-ventas" className="menu-link">
            <Wallet2 className="me-2" aria-hidden="true" />
            <span>Mis ventas</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* productos */}
      <h6 className="menu-title">Productos</h6>
      <Nav className="flex-column menu-list mb-4">
        <Nav.Item>
          <Nav.Link as={NavLink} to="/panel/productos" className="menu-link">
            <Grid className="me-2" aria-hidden="true" />
            <span>Mis productos</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* administración */}
      <h6 className="menu-title">Administración</h6>
      <Nav className="flex-column menu-list">
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/panel/admin/usuarios"
            className="menu-link"
          >
            <PeopleFill className="me-2" aria-hidden="true" />
            <span>Usuarios</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={NavLink}
            to="/panel/admin/compraventas"
            className="menu-link"
          >
            <BoxSeam className="me-2" aria-hidden="true" />
            <span>Compraventas</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Menu;
