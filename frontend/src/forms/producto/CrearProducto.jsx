import { Button, Form, InputGroup, Modal } from 'react-bootstrap';

function CrearProducto({ onSubmit, onCancel }) {
  return (
    <Form onSubmit={onSubmit}>
      <Modal.Body className="p-4">
        <Form.Group className="mb-3" controlId="productoTitulo">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Título del producto"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productoDescripcion">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            className="rounded-3"
            placeholder="Breve descripción del producto."
            style={{ resize: 'vertical', maxHeight: '200px' }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productoPrecio">
          <Form.Label>Precio</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              required
            />
            <InputGroup.Text>&euro;</InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="productoCategoria">
          <Form.Label>Categoria</Form.Label>
          <Form.Select defaultValue="">
            <option value="" disabled>
              Selecciona una categoria
            </option>
            <option value="tecnologia">Tecnologia</option>
            <option value="hogar">Hogar</option>
            <option value="moda">Moda</option>
            <option value="deporte">Deporte</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="productoEstado">
          <Form.Label>Estado</Form.Label>
          <Form.Select defaultValue="" required>
            <option value="" disabled>
              Selecciona un estado
            </option>
            <option value="1">A estrenar</option>
            <option value="2">Como nuevo</option>
            <option value="3">Buen estado</option>
            <option value="4">Aceptable</option>
            <option value="5">Para piezas</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="productoImagen">
          <Form.Label>Imagen (URL)</Form.Label>
          <Form.Control type="url" placeholder="https://" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productoEnvio">
          <Form.Check
            type="switch"
            label="Envio disponible"
            name="envioDisponible"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="dark" type="submit">
          Guardar
        </Button>
      </Modal.Footer>
    </Form>
  );
}

export default CrearProducto;
