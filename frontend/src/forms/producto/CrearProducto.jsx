import useDocumentTitle from '@/hooks/useDocumentTitle';
import { useState } from 'react';
import { Alert, Button, Form, InputGroup, Modal } from 'react-bootstrap';

import { CheckCircle, XCircle } from 'react-bootstrap-icons';


import { VALIDATION_MESSAGES } from '@/config/messages';
import useApiPrivate from '@/hooks/useApiPrivate';
import createProductService from '@/services/productService';

function CrearProducto({ onSubmit, onCancel }) {
  useDocumentTitle('Nuevo producto');

  const apiPrivate = useApiPrivate();
  const productService = createProductService(apiPrivate);

  const [validated, setValidated] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [estado, setEstado] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [envioDisponible, setEnvioDisponible] = useState(false);

  const [precioNegativo, setPrecioNegativo] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrecioNegativo(false);
    setErrMsg('');

    if (precio < 0) {
      setPrecioNegativo(true);
      setValidated(true);
      return;
    }

    if (!e.currentTarget.checkValidity()) {
      setValidated(true);
      return;
    }

    try {
      const estado = "COMO_NUEVO";
      const payload = {
        titulo,
        descripcion,
        precio: parseFloat(precio),
        estado,
        categoriaId,
        envioDisponible,
      };

      await productService.createProduct(payload);

      setValidated(false);
      setTitulo('');
      setDescripcion('');
      setPrecio('');
      setEstado('');
      setCategoriaId('');
      setEnvioDisponible(false);

      if (onSubmit) onSubmit(e);
    } catch (err) {
      setValidated(false);
      setErrMsg(
        err.response?.data?.message ||
          err.response?.data?.error ||
          'Ha ocurrido un error al crear el producto.'
      );
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Modal.Body className="p-4">
        {errMsg && <Alert variant="danger">{errMsg}</Alert>}

        <Form.Group className="mb-3" controlId="productoTitulo">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Título del producto"
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {VALIDATION_MESSAGES.REQUIRED}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="productoDescripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            className="rounded-3"
            placeholder="Breve descripción del producto."
            style={{ resize: 'vertical', maxHeight: '200px' }}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productoPrecio">
          <Form.Label>Precio</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              required
              isInvalid={precioNegativo}
              value={precio}
              onChange={(e) => {
                const newPrecio = e.target.value;
                setPrecio(newPrecio);
                if (Number(newPrecio) >= 0) setPrecioNegativo(false);
              }}
            />
            <InputGroup.Text>&euro;</InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {precioNegativo
                ? VALIDATION_MESSAGES.PRECIO_NEGATIVO
                : VALIDATION_MESSAGES.REQUIRED}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        {/*
        <Form.Group className="mb-3" controlId="productoCategoria">
          <Form.Label>Categoría</Form.Label>
          <Form.Select defaultValue="">
            <option value="" disabled>
              Selecciona una categoria
            </option>
            <option value="tecnologia">Tecnología</option>
            <option value="hogar">Hogar</option>
            <option value="moda">Moda</option>
            <option value="deporte">Deporte</option>
          </Form.Select>
        </Form.Group>
        */}

        <Form.Group className="mb-3" controlId="productoCategoriaId">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            type="text"
            placeholder="Identificador de la categoría"
            required
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {VALIDATION_MESSAGES.REQUIRED}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="productoEstado">
          <Form.Label>Estado</Form.Label>
          <Form.Select
            required
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="" disabled>
              Selecciona un estado
            </option>
            <option value="A_ESTRENAR">A estrenar</option>
            <option value="COMO_NUEVO">Como nuevo</option>
            <option value="BUEN_ESTADO">Buen estado</option>
            <option value="ACEPTABLE">Aceptable</option>
            <option value="PARA_PIEZAS">Para piezas</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {VALIDATION_MESSAGES.REQUIRED}
          </Form.Control.Feedback>
        </Form.Group>

        {/*
        <Form.Group className="mb-3" controlId="productoImagen">
          <Form.Label>Imagen (URL)</Form.Label>
          <Form.Control type="url" placeholder="https://" />
        </Form.Group>
        */}

        <Form.Group className="mb-3" controlId="productoEnvio">
          <Form.Check
            type="switch"
            label="Envío disponible"
            name="envioDisponible"
            checked={envioDisponible}
            onChange={(e) => setEnvioDisponible(e.target.checked)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onCancel}>
          <XCircle className="me-2" />
          Cancelar
        </Button>
        <Button variant="dark" type="submit">
          <CheckCircle className="me-2" />
          Crear
        </Button>
      </Modal.Footer>
    </Form>
  );
}

export default CrearProducto;
