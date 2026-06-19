import { useEffect, useState } from 'react';
import { Alert, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { CheckCircle, XCircle } from 'react-bootstrap-icons';
import { Typeahead } from 'react-bootstrap-typeahead';

import { toast } from 'sonner';

import { VALIDATION_MESSAGES } from '@/config/messages';
import useApiPrivate from '@/hooks/useApiPrivate';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import createProductService from '@/services/productService';

import './CrearProducto.css';

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
  const [urlImagen, setUrlImagen] = useState('');
  const [opcionesCategoria, setOpcionesCategoria] = useState([]);
  const [opcionesEstado, setOpcionesEstado] = useState({});
  const [categoriaId, setCategoriaId] = useState('');
  const [envioDisponible, setEnvioDisponible] = useState(false);

  const [precioNegativo, setPrecioNegativo] = useState(false);

  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const categorias = await productService.getCategoriasProductos();
        setOpcionesCategoria(categorias);
      } catch (err) {
        console.error('Error al cargar las categorias de productos:', err);
      }
    };

    const loadEstados = async () => {
      try {
        const estadosValor = await productService.getEstadosProducto();
        setOpcionesEstado(estadosValor);
      } catch (err) {
        console.error('Error al cargar los estados de producto:', err);
      }
    };

    loadCategorias();
    loadEstados();
  }, []);

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
        titulo,
        descripcion,
        precio: parseFloat(precio),
        estado,
        categoriaId,
        urlImagen,
        envioDisponible,
      };

      await productService.createProduct(payload);

      setValidated(false);
      setTitulo('');
      setDescripcion('');
      setPrecio('');
      setEstado('');
      setCategoriaId('');
      setUrlImagen('');
      setEnvioDisponible(false);

      if (onSubmit) {
        onSubmit(e);
        toast.success('Producto creado correctamente');
      }
    } catch (err) {
      setValidated(false);
      setErrMsg(
        err.response?.data?.message ||
          err.response?.data?.error ||
          'Ha ocurrido un error al crear el producto.'
      );
      toast.error('Error al crear el producto');
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

        <Form.Group className="mb-3" controlId="productoCategoria">
          <Form.Label>Categoría</Form.Label>
          <Typeahead
            id="producto-categoria-typeahead"
            labelKey="nombre"
            onChange={(selected) => {
              if (selected.length > 0) {
                setCategoriaId(selected[0].id);
              } else {
                setCategoriaId('');
              }
            }}
            options={opcionesCategoria}
            placeholder="Selecciona una categoría..."
            selected={opcionesCategoria.filter((c) => c.id === categoriaId)}
            clearButton
            renderMenuItemChildren={(p) => (
              <div>
                {p.nombre}
                <div className="text-muted">
                  <small>{p.descripcion}</small>
                </div>
              </div>
            )}
            inputProps={{ required: true }}
            isInvalid={validated && !categoriaId}
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
            {Object.entries(opcionesEstado).map(([key, value]) => {
              return (
                <option key={key} value={key}>
                  {value}
                </option>
              );
            })}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {VALIDATION_MESSAGES.REQUIRED}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="productoImagen">
          <Form.Label>Imagen (URL)</Form.Label>
          <Form.Control
            type="url"
            value={urlImagen}
            onChange={(e) => setUrlImagen(e.target.value)}
            placeholder="https://"
          />
          <Form.Control.Feedback type="invalid">
            {VALIDATION_MESSAGES.INVALID_URL}
          </Form.Control.Feedback>
        </Form.Group>

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
