import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';

import ModificarProducto from '@/forms/producto/ModificarProducto';
import useApiPrivate from '@/hooks/useApiPrivate';
import useAuth from '@/hooks/useAuth';
import createCompraventaService from '@/services/compraventaService';
import createProductService from '@/services/productService';

import './VerProducto.css';

const VerProducto = () => {
  const { id } = useParams();
  const apiPrivate = useApiPrivate();
  const productService = createProductService(apiPrivate);
  const compraventaService = createCompraventaService(apiPrivate);
  const { auth } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [estados, setEstados] = useState({});
  const [errMsg, setErrMsg] = useState('');

  const esDueño = producto?.vendedorId === auth?.usuario;
  const estaDisponible = producto?.disponible;

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const botonComprar = async () => {
    if (!auth?.accessToken) {
      navigate('/login');
    } else {
      try {
        await compraventaService.realizarCompra(id);
        setProducto({ ...producto, disponible: false });
        toast.success('Producto comprado correctamente');
      } catch (error) {
        console.error('Error al guardar la compra', error);
        toast.error('Error al comprar el producto');
      }
    }
  };

  const botonEditar = handleOpenModal;

  const handleSubmitEdicion = async () => {
    handleCloseModal();
    try {
      const data = await productService.getProduct(id);
      setProducto(data);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  const botonEliminar = async () => {
    try {
      await productService.deleteProduct(id);
      navigate('/panel/productos');
      toast.success('Producto eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el producto', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, estadosData] = await Promise.all([
          productService.getProduct(id),
          productService.getEstadosProducto(),
        ]);
        setProducto(data);
        setEstados(estadosData);

        try {
          await productService.addVisualizacion(id);
          setProducto((prev) => ({
            ...prev,
            visualizaciones: prev.visualizaciones + 1,
          }));
        } catch (err) {
          console.error('Error al registrar visualización:', err);
        }
      } catch (error) {
        console.error('Error al ver el producto:', error);
        setErrMsg('Error al ver el producto');
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);
  return (
    <div className="ver-producto-pagina">
      {errMsg && <div className="alert alert-danger">{errMsg}</div>}
      {producto ? (
        <>
          <div className="producto-card shadow-sm rounded-4 overflow-hidden">
            <div className="producto-layout">
              <div className="producto-foto-container">
                <img
                  className="producto-foto"
                  src={
                    producto.urlImagen ||
                    'https://placehold.co/600x400?text=Sin%0AImagen&font=roboto'
                  }
                  alt={producto.titulo}
                />
              </div>
              <div className="producto-detalles-container">
                <div className="producto-detalles-header">
                  <span className="badge bg-primary text-uppercase mb-3 px-3 py-2 rounded-pill">
                    {producto.nombreCategoria}
                  </span>
                  <h1 className="producto-titulo">{producto.titulo}</h1>
                  <div className="d-flex align-items-center mb-4 gap-3">
                    <h2 className="producto-precio text-primary mb-0">
                      {producto.precio}€
                    </h2>
                    <span className="badge bg-light text-dark px-3 py-2 rounded-pill border">
                      Estado: {estados[producto.estado] || producto.estado}
                    </span>
                  </div>
                </div>

                <div className="producto-detalles-body mb-5">
                  <p className="text-muted mb-4 small">
                    {producto.visualizaciones} personas han visto esto
                  </p>
                  <h5> Descripción </h5>
                  <p className="producto-descripcion text-secondary">
                    {producto.descripcion}
                  </p>
                </div>
                <div className="producto-acciones d-flex gap-3">
                  {!esDueño && estaDisponible && (
                    <Button
                      variant="primary"
                      className="btn-comprar w-100 py-3 fw-bold rounded-3 text-uppercase shadow-sm"
                      onClick={botonComprar}
                    >
                      Comprar ahora
                    </Button>
                  )}
                  {esDueño && estaDisponible && (
                    <Button
                      variant="secondary"
                      className="btn-editar w-50 py-3 fw-bold rounded-3 text-uppercase shadow-sm"
                      onClick={botonEditar}
                    >
                      Editar producto
                    </Button>
                  )}
                  {esDueño && estaDisponible && (
                    <Button
                      variant="danger"
                      className="btn-eliminar w-30 py-3 fw-bold rounded-3 text-uppercase shadow-sm"
                      onClick={botonEliminar}
                    >
                      Eliminar producto
                    </Button>
                  )}
                  {!estaDisponible && (
                    <p className="text-secondary fw-bold fs-5 mt-3 text-center">
                      Producto no disponible
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Cargando detalles del producto...</p>
      )}

      {producto && (
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          centered
          dialogClassName="mis-productos-nuevo-modal"
          contentClassName="rounded-4"
        >
          <Modal.Header closeButton>
            <Modal.Title>Modificar producto</Modal.Title>
          </Modal.Header>
          <ModificarProducto
            producto={producto}
            onSubmit={handleSubmitEdicion}
            onCancel={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default VerProducto;
