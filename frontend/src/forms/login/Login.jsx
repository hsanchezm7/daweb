import { useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Login.css';

function Login() {
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const toggleVisibilidad = () => setMostrarPassword(!mostrarPassword);

  return (
    <>
      {/* título */}
      <h2 className="mb-5 fw-bold">Iniciar sesión</h2>

      {/* github OAuth2. TODO: usar React Bootstrap button */}
      <Button
        variant="dark"
        className="w-100 mb-4 py-2 d-inline-flex gap-2 align-items-center justify-content-center"
      >
        <FontAwesomeIcon icon={faGithub} />
        Iniciar sesión con GitHub
      </Button>

      {/* separador */}
      <div className="d-flex align-items-center mb-4">
        <hr className="flex-grow-1" />
        <span
          className="mx-3 text-muted fw-bold"
          style={{ fontSize: '0.9rem' }}
        >
          O bien
        </span>
        <hr className="flex-grow-1" />
      </div>

      {/* formulario. TODO: usar https://react-bootstrap.netlify.app/docs/forms/overview */}
      <Form>
        <Form.Group className="mb-4" controlId="formEmail">
          <Form.Control
            type="email"
            className="py-2 px-3 mb-1"
            placeholder="email*"
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formPassword">
          <InputGroup>
            <Form.Control
              type={mostrarPassword ? 'text' : 'password'}
              className="py-2 px-3"
              placeholder="contraseña*"
              required
            />
            <InputGroup.Text
              onClick={toggleVisibilidad}
              style={{ cursor: 'pointer', backgroundColor: 'transparent' }}
            >
              {mostrarPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>

        {/* contraseña olvidada */}
        {/* 
        <div className="mb-4 text-start">
          <Link to="/recuperar-password" className="text-decoration-underline text-muted small">
            He olvidado mi contraseña
          </Link>
        </div>
        */}

        {/* botón principal login */}
        <div className="mb-4 text-center">
          <Button variant="primary" type="submit" className="py-2 px-4">
            Iniciar sesión
          </Button>
        </div>
      </Form>

      {/* botón secundario crear cuenta */}
      <div className="mt-5 text-center">
        <p className="fw-bold mb-3 small">¿No tienes cuenta?</p>
        <Button
          as={Link}
          to="/registro"
          variant="outline-dark"
          className="py-2 px-4"
        >
          Crear cuenta
        </Button>
      </div>
    </>
  );
}

export default Login;
