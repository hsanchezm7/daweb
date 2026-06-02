import { useEffect, useState } from 'react';
import {
  Alert,
  Col,
  Container,
  Form,
  Pagination,
  Row,
  Table,
} from 'react-bootstrap';
import { ArrowDownUp, ArrowLeftRight } from 'react-bootstrap-icons';
import { Typeahead } from 'react-bootstrap-typeahead';

import { formatDateTimeFromBackend } from '@/config/datepicker';
import useApiPrivate from '@/hooks/useApiPrivate';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import createCompraventaService from '@/services/compraventaService';
import createUserService from '@/services/userService';

import './Compraventas.css';

function Compraventas() {
  useDocumentTitle('Compraventas');

  const apiPrivate = useApiPrivate();
  const compraventaService = createCompraventaService(apiPrivate);
  const userService = createUserService(apiPrivate);

  const [compraventas, setCompraventas] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    size: 0,
    totalElements: 0,
    totalPages: 0,
    number: 0,
  });

  const [opcionesUsuarios, setOpcionesUsuarios] = useState([]);
  const [idVendedor, setIdVendedor] = useState('');
  const [idComprador, setIdComprador] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleIntercambio = () => {
    setIdVendedor(idComprador);
    setIdComprador(idVendedor);
  };

  useEffect(() => {
    const loadUsuarios = async () => {
      try {
        const data = await userService.getUsers();
        setOpcionesUsuarios((data.usuario || []).map((u) => u.resumen));
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    };

    loadUsuarios();
  }, []);

  useEffect(() => {
    const loadCompraventas = async () => {
      try {
        const params = {};
        if (idVendedor) params.idVendedor = idVendedor;
        if (idComprador) params.idComprador = idComprador;
        // params.page y params.size se añadirán al hacer la paginación

        const data = await compraventaService.getCompraventas(params);

        const compraventas = data._embedded?.compraventaResumenList || [];
        const pageInfo = data.page;

        setCompraventas(compraventas);
        setPageInfo(pageInfo);
      } catch (error) {
        console.error('Error al cargar las compraventas:', error);
        setErrMsg('Error al cargar las compraventas');
      }
    };

    loadCompraventas();
  }, [idVendedor, idComprador]); // dependencias

  return (
    <Container className="compraventas" fluid>
      <div className="mb-4">
        <h2 className="mb-2">Compraventas</h2>
        <p className="text-muted m-0">
          Consultas las compraventas realizadas en la aplicación. Busca por
          vendedor, por comprador, o por ambos.
        </p>
      </div>

      <Row className="mb-4 align-items-md-end">
        <Col md={5}>
          <Form.Group controlId="filtroVendedor">
            <Form.Label>Vendedor</Form.Label>
            <Typeahead
              id="vendedor-typeahead"
              labelKey="nombreCompleto"
              onChange={([selected]) => setIdVendedor(selected?.id || '')}
              options={
                idComprador
                  ? opcionesUsuarios.filter((u) => u.id !== idComprador)
                  : opcionesUsuarios
              }
              placeholder="Buscar por vendedor..."
              selected={opcionesUsuarios.filter((u) => u.id === idVendedor)}
              clearButton
              renderMenuItemChildren={(option) => (
                <div className="d-flex align-items-center">
                  <img
                    src={`https://api.dicebear.com/10.x/thumbs/svg?borderRadius=50&scale=0.70&backgroundColorFill=linear&backgroundColorFillStops=2&seed=${option.id}`}
                    alt="avatar"
                    className="me-3"
                    style={{ width: '32px', height: '32px' }}
                  />
                  <div>
                    {option.nombreCompleto}
                    <div className="text-muted">
                      <small>{option.email || '-'}</small>
                    </div>
                  </div>
                </div>
              )}
            />
          </Form.Group>
        </Col>
        <Col
          md={2}
          className="d-flex justify-content-center py-3 py-md-0 mb-md-2"
        >
          <div
            onClick={handleIntercambio}
            style={{ cursor: 'pointer' }}
            title="Intercambiar vendedor y comprador"
          >
            <ArrowLeftRight
              size={20}
              onClick={handleIntercambio}
              style={{ cursor: 'pointer' }}
              className="d-none d-md-block text-primary"
            />
            <ArrowDownUp size={20} className="d-block d-md-none text-primary" />
          </div>
        </Col>
        <Col md={5}>
          <Form.Group controlId="filtroComprador">
            <Form.Label>Comprador</Form.Label>
            <Typeahead
              id="comprador-typeahead"
              labelKey="nombreCompleto"
              onChange={([selected]) => setIdComprador(selected?.id || '')}
              options={
                idVendedor
                  ? opcionesUsuarios.filter((u) => u.id !== idVendedor)
                  : opcionesUsuarios
              }
              placeholder="Buscar por comprador..."
              clearButton
              paginate
              selected={opcionesUsuarios.filter((u) => u.id === idComprador)}
              renderMenuItemChildren={(option) => (
                <div className="d-flex align-items-center">
                  <img
                    src={`https://api.dicebear.com/10.x/thumbs/svg?borderRadius=50&scale=0.70&backgroundColorFill=linear&backgroundColorFillStops=2&seed=${option.id}`}
                    alt="avatar"
                    className="me-3"
                    style={{ width: '32px', height: '32px' }}
                  />
                  <div>
                    {option.nombreCompleto}
                    <div className="text-muted">
                      <small>{option.email || '-'}</small>
                    </div>
                  </div>
                </div>
              )}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* el flujo es el siguiente: si hay un error (errMsg), sólo mostrar el error. si no: si no hay compraventas,
      mostrar una única fila No Data. Si los hay, mostrar la lista de compraventas */}
      {errMsg ? (
        <Alert variant="danger">{errMsg}</Alert>
      ) : (
        <Table
          striped
          hover
          responsive
          size="sm"
          className="compraventas-table align-middle mt-lg-4"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>ID Producto</th>
              <th>Vendedor</th>
              <th>Comprador</th>
              <th>Fecha y hora</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {compraventas.length > 0 ? (
              compraventas.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.titulo}</td>
                  <td>{c.idProducto}</td>
                  <td>{c.nombreVendedor}</td>
                  <td>{c.nombreComprador}</td>
                  <td>{formatDateTimeFromBackend(c.fecha)}</td>
                  <td>{`${c.precio} \u20AC`}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  Sin datos.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* TODO: Crear componente Paginador para reusar en todo el frontend */}
      <Pagination className="compraventas-pagination mt-4">
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Ellipsis />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </Container>
  );
}

export default Compraventas;
