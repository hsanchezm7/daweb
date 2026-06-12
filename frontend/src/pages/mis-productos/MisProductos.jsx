import { useEffect, useState } from 'react';
import { Alert, Card, Modal } from 'react-bootstrap';
import { PlusCircleDotted } from 'react-bootstrap-icons';

import { TIPO_CARD } from '@/components/card-producto/CardProducto';
import GridProductos from '@/components/grid-productos/GridProductos';
import CrearProducto from '@/forms/producto/CrearProducto';
import useApiPrivate from '@/hooks/useApiPrivate';
import useAuth from '@/hooks/useAuth';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import createProductService from '@/services/productService';

import './MisProductos.css';

function MisProductos() {
  useDocumentTitle('Mis productos');

  const { auth } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const apiPrivate = useApiPrivate();
  const productService = createProductService(apiPrivate);

  const [misProductos, setMisProductos] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    size: 0,
    totalElements: 0,
    totalPages: 0,
    number: 0,
  });

  const [errMsg, setErrMsg] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCloseModal();
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const loadMisProductos = async () => {
      try {
        const params = {};
        params.idVendedor = auth.usuario;
        // params.page y params.size se añadirán al hacer la paginación

        const data = await productService.getProductos(params);

        const productos = data._embedded?.productoResumenList || [];
        const pageInfo = data.page;

        setMisProductos(productos);
        setPageInfo(pageInfo);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
        setErrMsg('Error al cargar los productos');
      }
    };

    loadMisProductos();
  }, [refreshTrigger]);

  const renderNuevoProductoCard = () => (
    <Card className="h-100 rounded-5 overflow-hidden shadow-sm mis-productos-nuevo">
      <Card.Body
        className="d-flex flex-column align-items-center justify-content-center text-center p-4"
        role="button"
        tabIndex={0}
        onClick={handleOpenModal}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleOpenModal();
          }
        }}
      >
        <PlusCircleDotted
          className="mb-3 mis-productos-nuevo-icono"
          aria-hidden="true"
        />
        <Card.Title className="mb-2">Subir producto</Card.Title>
        <Card.Text className="text-muted mb-3">
          Publica un nuevo producto en segundos.
        </Card.Text>
      </Card.Body>
    </Card>
  );

  return (
    <div className="mis-productos">
      <div className="mb-5">
        <h2 className="mb-2">Mis productos</h2>
        <p className="text-muted m-0">Consulta tus productos anunciados.</p>
      </div>

      {errMsg && <Alert variant="danger">{errMsg}</Alert>}

      <GridProductos
        className="mis-productos-grid"
        nuevoProductoCard={renderNuevoProductoCard()}
        productos={misProductos}
        tipoCard={TIPO_CARD.MIS_PRODUCTOS}
        onDelete={() => setRefreshTrigger((prev) => prev + 1)}
        onEdit={() => setRefreshTrigger((prev) => prev + 1)}
      />

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        dialogClassName="mis-productos-nuevo-modal"
        contentClassName="rounded-4"
      >
        <Modal.Header closeButton>
          <Modal.Title>Nuevo producto</Modal.Title>
        </Modal.Header>
        <CrearProducto onSubmit={handleSubmit} onCancel={handleCloseModal} />
      </Modal>
    </div>
  );
}

export default MisProductos;
