import { useEffect, useRef, useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import {
  ArrowRightCircle,
  CalendarFill,
  Eye,
  EyeSlash,
} from 'react-bootstrap-icons';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IntlTelInput from '@intl-tel-input/react';
import { es as esPhoneLocale } from 'intl-tel-input/locale';
import 'intl-tel-input/styles';

import {
  createBirthDatePicker,
  formatDateForDisplay,
  formatDateForPayload,
} from '@/config/datepicker';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import authService from '@/services/authService';
import { AUTH_MESSAGES, VALIDATION_MESSAGES, getPhoneErrorMessage } from '@/config/messages';

import './Register.css';


function Register() {
  useDocumentTitle('Crear cuenta');

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const toggleVisibilidad = () => setMostrarPassword(!mostrarPassword);

  const [mostrarPasswordConfirmar, setMostrarPasswordConfirmar] =
    useState(false);
  const toggleVisibilidadConfirmar = () =>
    setMostrarPasswordConfirmar(!mostrarPasswordConfirmar);

  const [validated, setValidated] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');

  const [telefono, setTelefono] = useState('');
  const [telefonoValido, setTelefonoValido] = useState(true);
  const [telefonoErrorCode, setTelefonoErrorCode] = useState(null);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const fechaRef = useRef(null);
  const datepickerRef = useRef(null);

  useEffect(() => {
    if (!fechaRef.current) return;

    const picker = createBirthDatePicker(fechaRef.current);
    datepickerRef.current = picker;

    const handleChange = (event) => {
      const date = event.detail?.date;
      setFechaNacimiento(date ? formatDateForDisplay(date) : '');
    };

    fechaRef.current.addEventListener('change.td', handleChange);
    const el = fechaRef.current;

    return () => {
      el.removeEventListener('change.td', handleChange);
      picker.dispose();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg('');
    setSuccess(false);
    setPasswordMismatch(false);

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return;
    }

    if (password !== confirmarPassword) {
      setPasswordMismatch(true);
      setValidated(true);
      return;
    }

    if (!telefono || !telefonoValido) {
      setValidated(true);
      return;
    }

    try {
      await authService.register({
        nombre,
        apellidos: apellidos || undefined,
        email,
        clave: password,
        fechaNacimiento: formatDateForPayload(fechaNacimiento) || undefined,
        telefono: telefono || undefined,
      });

      setSuccess(true);
    } catch (err) {
      setValidated(false);
      setErrMsg(
        err.response?.data?.message ||
          err.response?.data?.error ||
          AUTH_MESSAGES.SERVER_ERROR
      );
    }
  };

  return (
    <>
      <h2 className="mb-5 fw-bold">Crear cuenta</h2>

      <Button
        variant="dark"
        href="http://localhost:8080/oauth2/authorization/github"
        className="w-100 mb-4 py-2 d-inline-flex gap-2 align-items-center justify-content-center"
      >
        <FontAwesomeIcon icon={faGithub} />
        Acceder con GitHub
      </Button>

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

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {errMsg && <Alert variant="danger">{errMsg}</Alert>}

        {success && (
          <Alert variant="success">
            {AUTH_MESSAGES.REGISTER_SUCCESS}{' '}
            <Link to="/login" className="alert-link">
              Iniciar sesión
            </Link>
            .
          </Alert>
        )}

        <Form.Floating className="mb-4">
          <Form.Control
            id="formNombre"
            type="text"
            placeholder="Nombre"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <label htmlFor="formNombre">Nombre</label>
          <Form.Control.Feedback type="invalid">
            {VALIDATION_MESSAGES.REQUIRED}
          </Form.Control.Feedback>
        </Form.Floating>

        <Form.Floating className="mb-4">
          <Form.Control
            id="formApellidos"
            type="text"
            placeholder="Apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
          <label htmlFor="formApellidos">Apellidos</label>
        </Form.Floating>

        <Form.Floating className="mb-4">
          <Form.Control
            id="formEmail"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="formEmail">Email</label>
          <Form.Control.Feedback type="invalid">
            {VALIDATION_MESSAGES.REQUIRED}
          </Form.Control.Feedback>
        </Form.Floating>

        <InputGroup className="mb-4" hasValidation>
          <Form.Floating>
            <Form.Control
              id="formPassword"
              type={mostrarPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              required
              isInvalid={passwordMismatch}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordMismatch(false);
              }}
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
            {passwordMismatch
              ? VALIDATION_MESSAGES.PASSWORD_MISMATCH
              : VALIDATION_MESSAGES.REQUIRED}
          </Form.Control.Feedback>
        </InputGroup>

        <InputGroup className="mb-4" hasValidation>
          <Form.Floating>
            <Form.Control
              id="formConfirmarPassword"
              type={mostrarPasswordConfirmar ? 'text' : 'password'}
              placeholder="Confirmar contraseña"
              required
              isInvalid={passwordMismatch}
              value={confirmarPassword}
              onChange={(e) => {
                setConfirmarPassword(e.target.value);
                setPasswordMismatch(false);
              }}
            />
            <label htmlFor="formConfirmarPassword">Confirmar contraseña</label>
          </Form.Floating>
          <InputGroup.Text
            onClick={toggleVisibilidadConfirmar}
            style={{ cursor: 'pointer', backgroundColor: 'transparent' }}
          >
            {mostrarPasswordConfirmar ? (
              <EyeSlash size={20} />
            ) : (
              <Eye size={20} />
            )}
          </InputGroup.Text>
          <Form.Control.Feedback type="invalid">
            {passwordMismatch
              ? VALIDATION_MESSAGES.PASSWORD_MISMATCH
              : VALIDATION_MESSAGES.REQUIRED}
          </Form.Control.Feedback>
        </InputGroup>

        <InputGroup className="mb-4">
          <Form.Floating>
            <Form.Control
              ref={fechaRef}
              id="formFechaNacimiento"
              type="text"
              placeholder="dd/MM/aaaa"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
            <label htmlFor="formFechaNacimiento">Fecha de nacimiento</label>
          </Form.Floating>
          <InputGroup.Text
            onClick={() => datepickerRef.current?.toggle()}
            style={{ cursor: 'pointer', backgroundColor: 'transparent' }}
          >
            <CalendarFill size={20} />
          </InputGroup.Text>
        </InputGroup>

        <Form.Group className="mb-4">
          <div dir="ltr">
            <IntlTelInput
              initialCountry="es"
              countryNameLocale="es"
              uiTranslations={esPhoneLocale}
              loadUtils={() => import('intl-tel-input/utils')}
              value={telefono}
              onChangeNumber={setTelefono}
              onChangeValidity={setTelefonoValido}
              onChangeErrorCode={setTelefonoErrorCode}
              placeholderNumberType="MOBILE"
              placeholderNumberPolicy="AGGRESSIVE"
              inputProps={{
                id: 'formTelefono',
                required: true,
                className: `form-control w-100 py-3 ${(!telefono || !telefonoValido) && validated ? 'is-invalid' : ''}`,
              }}
            />
            {(!telefono || !telefonoValido) && validated && (
              <div className="invalid-feedback d-block mt-1">
                {!telefono
                  ? VALIDATION_MESSAGES.REQUIRED
                  : getPhoneErrorMessage(telefonoErrorCode)}
              </div>
            )}
          </div>
        </Form.Group>

        <div className="mb-4 text-center">
          <Button
            variant="primary"
            type="submit"
            className="py-2 px-4 align-items-center d-inline-flex gap-2"
          >
            Crear cuenta
            <ArrowRightCircle size={18} />
          </Button>
        </div>
      </Form>

      <div className="mt-5 text-center">
        <p className="fw-bold mb-3 small">¿Ya tienes cuenta?</p>
        <Button
          as={Link}
          to="/login"
          variant="outline-dark"
          className="py-2 px-4"
        >
          Iniciar sesión
        </Button>
      </div>
    </>
  );
}

export default Register;
