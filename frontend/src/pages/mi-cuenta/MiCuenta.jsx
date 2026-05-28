import { useEffect, useRef } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import { TempusDominus, loadLocale } from '@eonasdan/tempus-dominus';
import '@eonasdan/tempus-dominus/dist/css/tempus-dominus.min.css';
import {
  localization as esLocalization,
  name as esName,
} from '@eonasdan/tempus-dominus/dist/locales/es';

import './MiCuenta.css';

// locale ES para el date-picker
const esLocale = {
  ...esLocalization,
  format: 'L',
  dateFormats: {
    ...esLocalization.dateFormats,
    L: 'dd/MM/yyyy',
  },
};

loadLocale({ localization: esLocale, name: esName });

function MiCuenta() {
  const fechaNacimientoRef = useRef(null);
  const datepickerRef = useRef(null);

  useEffect(() => {
    if (!fechaNacimientoRef.current) return;

    // Date-only picker for birth date.
    datepickerRef.current = new TempusDominus(fechaNacimientoRef.current, {
      container: document.body,
      display: {
        icons: {
          type: 'icons',
          time: 'bi bi-clock',
          date: 'bi bi-calendar',
          up: 'bi bi-chevron-up',
          down: 'bi bi-chevron-down',
          previous: 'bi bi-chevron-left',
          next: 'bi bi-chevron-right',
          today: 'bi bi-calendar-check',
          clear: 'bi bi-trash',
          close: 'bi bi-x-lg',
        },
        components: {
          calendar: true,
          date: true,
          month: true,
          year: true,
          decades: true,
          clock: false,
          hours: false,
          minutes: false,
          seconds: false,
        },
        buttons: {
          today: true,
          clear: true,
          close: true,
        },
        inline: false,
      },
    });

    datepickerRef.current.locale(esName);

    return () => {
      datepickerRef.current?.dispose();
    };
  }, []);

  return (
    <Container className="mi-cuenta" fluid>
      <div className="mb-4">
        <h2 className="mb-2">Mi cuenta</h2>
        <p className="text-muted m-0">Actualiza tus datos de cuenta.</p>
      </div>

      <Form className="mi-cuenta-form">
        <Row className="g-3">
          <Col md={6}>
            <Form.Group controlId="accountNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Nombre" />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="accountApellidos">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control type="text" placeholder="Apellidos" />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="accountClave">
              <Form.Label>Clave</Form.Label>
              <Form.Control type="password" placeholder="Clave" />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="accountFechaNacimiento">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control
                ref={fechaNacimientoRef}
                type="text"
                placeholder="dd/MM/aaaa"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="accountTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="tel" placeholder="600 000 000" />
            </Form.Group>
          </Col>
        </Row>

        {/* TODO: añadir animación para cargar en click y mostrar icono
        de check si es correcto. */}
        <div className="d-flex justify-content-end mt-4">
          <Button variant="dark">Guardar cambios</Button>
        </div>
      </Form>
    </Container>
  );
}

export default MiCuenta;
