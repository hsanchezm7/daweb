import { Container, Dropdown, Form, Image } from 'react-bootstrap';
import { List } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import swapitLogo from '@/assets/swapit-logo.svg';
import useAuth from '@/hooks/useAuth';
import authService from '@/services/authService';

import './Header.css';

function Header({ onMenuToggle }) {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    } finally {
      console.log('Cerrando sesión...');

      setAuth({});
      navigate('/login', { replace: true });
    }
  };

  return (
    <header className="py-3 px-4 border-bottom">
      <Container
        fluid
        className="d-grid gap-3 align-items-center"
        style={{ gridTemplateColumns: '1fr 2fr 1fr' }}
      >
        {/* col-1: logo brand */}
        <div className="d-flex align-items-center">
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="btn btn-link link-body-emphasis p-0 me-3 d-lg-none d-flex align-items-center"
              aria-label="Abrir menú"
            >
              <List className="mx-2" size={28} />
            </button>
          )}
          <a
            href="/"
            className="d-flex align-items-center link-body-emphasis text-decoration-none"
          >
            <img src={swapitLogo} alt="swapIt Logo" height="36" />
          </a>
        </div>

        {/* col-2: barra búsqueda */}
        <div className="d-flex align-items-center justify-content-center">
          <Form className="w-100" role="search">
            <Form.Control
              type="search"
              placeholder="Buscar..."
              aria-label="Buscar"
            />
          </Form>
        </div>

        {/* col-3: perfil */}
        <div className="d-flex align-items-center justify-content-end">
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              id="dropdown-profile"
              className="text-decoration-none shadow-none p-0"
              style={{ border: 'none' }}
            >
              <Image
                src={`https://api.dicebear.com/10.x/thumbs/svg?borderRadius=50&scale=0.70&backgroundColorFill=linear&backgroundColorFillStops=2&seed=${auth?.usuario}`}
                alt={auth?.nombre}
                width="32"
                height="32"
                roundedCircle
              />
            </Dropdown.Toggle>

            <Dropdown.Menu className="text-small shadow">
              <Dropdown.Item href="#/new-project">New project...</Dropdown.Item>
              <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
              <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="me-2"
                />
                Cerrar sesión
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </header>
  );
}

export default Header;
