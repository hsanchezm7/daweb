import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { CalendarFill, CheckCircle } from 'react-bootstrap-icons';

import IntlTelInput from '@intl-tel-input/react';
import { es as esPhoneLocale } from 'intl-tel-input/locale';
import 'intl-tel-input/styles';
import { toast } from 'sonner';

import {
  createBirthDatePicker,
  formatDateForDisplay,
  formatDateForPayload,
  formatDateFromBackend,
} from '@/config/datepicker';
import {
  ACCOUNT_MESSAGES,
  VALIDATION_MESSAGES,
  getPhoneErrorMessage,
} from '@/config/messages';
import useApiPrivate from '@/hooks/useApiPrivate';
import useAuth from '@/hooks/useAuth';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import createUserService from '@/services/userService';

import './MiCuenta.css';

function MiCuenta() {
  useDocumentTitle('Mi cuenta');

  const { auth } = useAuth();
  const apiPrivate = useApiPrivate();
  const userService = createUserService(apiPrivate);

  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [clave, setClave] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [telefonoValido, setTelefonoValido] = useState(true);
  const [telefonoErrorCode, setTelefonoErrorCode] = useState(null);

  const [validated, setValidated] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [placeholders, setPlaceholders] = useState({
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
    telefono: '',
  });

  const fechaNacimientoRef = useRef(null);
  const datepickerRef = useRef(null);

  useEffect(() => {
    if (!fechaNacimientoRef.current) return;

    const picker = createBirthDatePicker(fechaNacimientoRef.current);
    datepickerRef.current = picker;

    const handleChange = (event) => {
      const date = event.detail?.date;
      setFechaNacimiento(date ? formatDateForDisplay(date) : '');
    };

    fechaNacimientoRef.current.addEventListener('change.td', handleChange);
    const el = fechaNacimientoRef.current;

    return () => {
      el.removeEventListener('change.td', handleChange);
      picker.dispose();
    };
  }, []);

  useEffect(() => {
    if (!auth?.usuario) return;

    const loadUser = async () => {
      try {
        const user = await userService.getUser(auth.usuario);

        setPlaceholders({
          nombre: user.nombre ?? '',
          apellidos: user.apellidos ?? '',
          fechaNacimiento: formatDateFromBackend(user.fechaNacimiento),
          telefono: user.telefono ?? '',
        });
      } catch (err) {
        console.error('Error al cargar los datos de MiCuenta:', err);
      }
    };

    loadUser();
  }, [auth?.usuario]);

  const isNombreInvalido = !nombre && !placeholders.nombre;
  const isTelefonoInvalido =
    (!telefono && !placeholders.telefono) || !telefonoValido;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg('');
    setSuccessMsg('');

    if (isNombreInvalido || isTelefonoInvalido) {
      setValidated(true);
      return;
    }

    try {
      const payload = {
        nombre: nombre || placeholders.nombre,
        apellidos: apellidos || placeholders.apellidos || undefined,
        clave: clave || undefined,
        fechaNacimiento: fechaNacimiento
          ? formatDateForPayload(fechaNacimiento)
          : placeholders.fechaNacimiento
            ? formatDateForPayload(placeholders.fechaNacimiento)
            : undefined,
        telefono: telefono || placeholders.telefono || undefined,
      };

      await userService.updateUser(auth.usuario, payload);
      setSuccessMsg(ACCOUNT_MESSAGES.UPDATE_SUCCESS);

      setPlaceholders({
        nombre: payload.nombre,
        apellidos: payload.apellidos || '',
        fechaNacimiento: fechaNacimiento || placeholders.fechaNacimiento,
        telefono: payload.telefono || '',
      });

      setNombre('');
      setApellidos('');
      setClave('');
      setFechaNacimiento('');
      setTelefono('');
      setValidated(false);
    } catch (err) {
      setValidated(false);
      setErrMsg(
        err.response?.data?.message ||
          err.response?.data?.error ||
          ACCOUNT_MESSAGES.UPDATE_ERROR
      );
      toast.error('Error al actualizar los datos');
    }
  };

  return (
    <div className="mi-cuenta">
      <div className="mb-5">
        <h2 className="mb-2">Mi cuenta</h2>
        <p className="text-muted m-0">Actualiza tus datos de cuenta.</p>
      </div>

      <Form className="mi-cuenta-form" noValidate onSubmit={handleSubmit}>
        {errMsg && <Alert variant="danger">{errMsg}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}

        <Row className="gy-2 gx-4">
          <Col md={6}>
            <Form.Group controlId="accountNombre" className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder={placeholders.nombre || 'Nombre'}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                isInvalid={isNombreInvalido && validated}
              />
              <Form.Control.Feedback type="invalid">
                {VALIDATION_MESSAGES.REQUIRED}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="accountApellidos" className="mb-3">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder={placeholders.apellidos || 'Apellidos'}
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="accountClave" className="mb-3">
              <Form.Label>Clave</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nueva clave"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="accountFechaNacimiento" className="mb-3">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <InputGroup>
                <Form.Control
                  ref={fechaNacimientoRef}
                  type="text"
                  placeholder={placeholders.fechaNacimiento || 'dd/MM/aaaa'}
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                />
                <InputGroup.Text
                  onClick={() => datepickerRef.current?.toggle()}
                  style={{ cursor: 'pointer', backgroundColor: 'transparent' }}
                >
                  <CalendarFill size={20} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="accountTelefono" className="mb-3">
              <Form.Label>Teléfono</Form.Label>
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
                    className: `form-control w-100 py-2 ${isTelefonoInvalido && validated ? 'is-invalid' : ''}`,
                    placeholder: placeholders.telefono || '600 000 000',
                  }}
                />
                {isTelefonoInvalido && validated && (
                  <div className="invalid-feedback d-block mt-1">
                    {!telefono && !placeholders.telefono
                      ? VALIDATION_MESSAGES.REQUIRED
                      : getPhoneErrorMessage(telefonoErrorCode)}
                  </div>
                )}
              </div>
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-4">
          <Button variant="dark" type="submit">
            <CheckCircle className="me-2" />
            Guardar cambios
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default MiCuenta;
