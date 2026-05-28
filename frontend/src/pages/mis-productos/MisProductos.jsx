import { useState } from 'react';
import { Card, Container, Modal } from 'react-bootstrap';
import { PlusCircleDotted } from 'react-bootstrap-icons';

import GridProductos from '../../components/grid-productos/GridProductos';
import CrearProducto from '../../forms/producto/CrearProducto';
import './MisProductos.css';

function MisProductos() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCloseModal();
  };

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
    <Container className="mis-productos" fluid>
      <div className="mb-4">
        <h2 className="mb-2">Mis productos</h2>
        <p className="text-muted m-0">Consulta tus productos anunciados.</p>
      </div>

      <GridProductos
        className="mis-productos-grid"
        nuevoProductoCard={renderNuevoProductoCard()}
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
    </Container>
  );
}

export default MisProductos;
