import { useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import { ArrowRightCircle, Eye, EyeSlash } from 'react-bootstrap-icons';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useAuth from '@/hooks/useAuth';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import authService from '@/services/authService';
import mapAuthResponse from '@/services/mapAuthResponse';
import { AUTH_MESSAGES, VALIDATION_MESSAGES } from '@/config/messages';

import './Login.css';

function Login() {
  useDocumentTitle('Iniciar sesión');

  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // navegación hacia atrás
  const from = location.state?.from?.pathname || '/';

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const toggleVisibilidad = () => setMostrarPassword(!mostrarPassword);

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg('');
    setLoginError(false);

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return;
    }

    try {
      const data = await authService.login(email, password);
      setAuth(mapAuthResponse(data, { email }));
      navigate(from, { replace: true });
    } catch (err) {
      setValidated(false);
      setLoginError(true);
      setErrMsg(
        err.response?.data?.message ||
          err.response?.data ||
          AUTH_MESSAGES.SERVER_ERROR
      );
    }
  };

  return (
    <>
      {/* título */}
      <h2 className="mb-5 fw-bold">Iniciar sesión</h2>

      {/* github OAuth2 */}
      <Button
        variant="dark"
        className="w-100 mb-4 py-2 d-inline-flex gap-2 align-items-center justify-content-center"
      >
        <FontAwesomeIcon icon={faGithub} />
        Acceder con GitHub
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

      {/* formulario */}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {errMsg && <Alert variant="danger">{errMsg}</Alert>}

        <Form.Floating className="mb-4">
          <Form.Control
            id="formEmail"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setLoginError(false);
            }}
            isInvalid={loginError}
          />
          <label htmlFor="formEmail">Email</label>
          <Form.Control.Feedback type="invalid">
            {loginError
              ? AUTH_MESSAGES.LOGIN_ERROR
              : VALIDATION_MESSAGES.REQUIRED}
          </Form.Control.Feedback>
        </Form.Floating>

        <InputGroup className="mb-4" hasValidation>
          <Form.Floating>
            <Form.Control
              id="formPassword"
              type={mostrarPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLoginError(false);
              }}
              isInvalid={loginError}
            />
            <label htmlFor="formPassword">Contraseña</label>
          </Form.Floating>
          <InputGroup.Text
            onClick={toggleVisibilidad}
            style={{ cursor: 'pointer', backgroundColor: 'transparent' }}
          >
            {mostrarPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
          </InputGroup.Text>
          <Form.Control.Feedback type="invalid">
            {loginError
              ? AUTH_MESSAGES.LOGIN_ERROR
              : VALIDATION_MESSAGES.REQUIRED}
          </Form.Control.Feedback>
        </InputGroup>

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
          <Button
            variant="primary"
            type="submit"
            className="py-2 px-4 align-items-center d-inline-flex gap-2"
          >
            Iniciar sesión
            <ArrowRightCircle size={18} />
          </Button>
        </div>
      </Form>

      {/* botón secundario crear cuenta */}
      <div className="mt-5 text-center">
        <p className="fw-bold mb-3 small">¿No tienes cuenta?</p>
        <Button
          as={Link}
          to="/signup"
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
