import { useState } from 'react';
import { Alert, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { CheckCircle, XCircle } from 'react-bootstrap-icons';

import { VALIDATION_MESSAGES } from '@/config/messages';
import useApiPrivate from '@/hooks/useApiPrivate';
import createProductService from '@/services/productService';

function ModificarProducto({ producto, onSubmit, onCancel }) {
  const apiPrivate = useApiPrivate();
  const productService = createProductService(apiPrivate);

  const [validated, setValidated] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const [descripcion, setDescripcion] = useState(producto?.descripcion || '');
  const [precio, setPrecio] = useState(producto?.precio || '');

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
      const payload = {
        descripcion,
        precio: parseFloat(precio),
      };

      await productService.updateProduct(producto.id, payload);

      setValidated(false);

      if (onSubmit) onSubmit(e);
    } catch (err) {
      setValidated(false);
      setErrMsg(
        err.response?.data?.message ||
          err.response?.data?.error ||
          'Ha ocurrido un error al modificar el producto.'
      );
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Modal.Body className="p-4">
        {errMsg && <Alert variant="danger">{errMsg}</Alert>}

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

      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onCancel}>
          <XCircle className="me-2" />
          Cancelar
        </Button>
        <Button variant="dark" type="submit">
          <CheckCircle className="me-2" />
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Form>
  );
}

export default ModificarProducto;
