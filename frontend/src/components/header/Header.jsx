import { useEffect, useState } from 'react';
import { Button, Container, Dropdown, Form, Image } from 'react-bootstrap';
import {
  ArrowRightCircleFill,
  BagCheckFill,
  BoxArrowRight,
  BoxSeam,
  Grid,
  List,
  PeopleFill,
  PersonFill,
  PersonPlus,
} from 'react-bootstrap-icons';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import swapitLogo from '@/assets/swapit-logo.svg';
import { Roles } from '@/config/roles';
import useAuth from '@/hooks/useAuth';
import authService from '@/services/authService';

import './Header.css';

function Header({ onMenuToggle }) {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [busqueda, setBusqueda] = useState(searchParams.get('query') || '');

  useEffect(() => {
    setBusqueda(searchParams.get('query') || '');
  }, [searchParams]);

  const handleBuscar = (e) => {
    e.preventDefault();
    if (busqueda.trim()) {
      navigate(`/buscar?query=${encodeURIComponent(busqueda.trim())}`);
    } else {
      navigate('/buscar');
    }
  };

  const isAuthenticated = !!auth?.accessToken;
  const isAdmin = auth?.roles?.includes(Roles.ADMIN);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    } finally {
      setAuth({});
      navigate('/login', { replace: true });
    }
  };

  return (
    <header className="py-3 px-4 border-bottom">
      <Container
        fluid
        className="d-grid gap-3 align-items-center"
        style={{ gridTemplateColumns: '1fr 1fr 1fr' }}
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
          <Link
            to="/"
            className="d-flex align-items-center link-body-emphasis text-decoration-none"
          >
            <img src={swapitLogo} alt="swapIt Logo" height="36" />
          </Link>
        </div>

        {/* col-2: barra búsqueda */}
        <div className="d-flex align-items-center justify-content-center">
          <Form className="w-100" role="search" onSubmit={handleBuscar}>
            <Form.Control
              type="search"
              placeholder="Buscar..."
              aria-label="Buscar"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Form>
        </div>

        {/* col-3: acciones de usuario */}
        <div className="d-flex align-items-center justify-content-end gap-2">
          {isAuthenticated ? (
            <>
              {/* botones según rol */}
              {isAdmin ? (
                <>
                  <Button
                    as={Link}
                    to="/panel/admin/usuarios"
                    variant="outline-dark"
                    className="d-flex align-items-center gap-2 me-2"
                    size="sm"
                  >
                    <PeopleFill aria-hidden="true" />
                    <span className="d-none d-xl-inline">Usuarios</span>
                  </Button>
                  <Button
                    as={Link}
                    to="/panel/admin/compraventas"
                    variant="outline-dark"
                    className="d-flex align-items-center gap-2 me-3"
                    size="sm"
                  >
                    <BoxSeam aria-hidden="true" />
                    <span className="d-none d-xl-inline">Compraventas</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    as={Link}
                    to="/panel/productos"
                    variant="outline-dark"
                    className="d-flex align-items-center gap-2 me-2"
                    size="sm"
                  >
                    <Grid aria-hidden="true" />
                    <span className="d-none d-xl-inline">Mis productos</span>
                  </Button>
                  <Button
                    as={Link}
                    to="/panel/compras"
                    variant="outline-dark"
                    className="d-flex align-items-center gap-2 me-3"
                    size="sm"
                  >
                    <BagCheckFill aria-hidden="true" />
                    <span className="d-none d-xl-inline">Mis compras</span>
                  </Button>
                </>
              )}

              {/* Avatar con dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-profile"
                  className="text-decoration-none shadow-none p-0 ms-1"
                  style={{ border: 'none' }}
                >
                  <Image
                    src={`https://api.dicebear.com/10.x/thumbs/svg?borderRadius=50&scale=0.70&backgroundColorFill=linear&backgroundColorFillStops=2&seed=${auth?.usuario}`}
                    alt={auth?.nombre ?? 'Perfil'}
                    width="32"
                    height="32"
                    roundedCircle
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="text-small shadow">
                  <Dropdown.Header>{auth?.nombre}</Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/panel/mi-cuenta">
                    <PersonFill className="me-2" aria-hidden="true" />
                    Mi cuenta
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={handleLogout}
                    className="text-danger d-flex align-items-center gap-2"
                  >
                    <BoxArrowRight aria-hidden="true" />
                    Cerrar sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
              <Button
                as={Link}
                to="/signup"
                variant="outline-dark"
                className="d-flex align-items-center gap-2 me-2"
                size="sm"
              >
                <PersonPlus className="d-lg-none" aria-hidden="true" />
                <span className="d-none d-lg-inline">Crear cuenta</span>
              </Button>
              <Button
                as={Link}
                to="/login"
                variant="dark"
                className="d-flex align-items-center gap-2"
                size="sm"
              >
                <ArrowRightCircleFill
                  className="d-lg-none"
                  aria-hidden="true"
                />
                <span className="d-none d-lg-inline">Iniciar sesión</span>
              </Button>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}

export default Header;
