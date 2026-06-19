import { useEffect, useState } from 'react';
import { Alert, Col, Container, Form, Offcanvas, Row } from 'react-bootstrap';
import { useOutletContext, useSearchParams } from 'react-router-dom';

import { TIPO_CARD } from '@/components/card-producto/CardProducto';
import Filtro from '@/components/filtro/Filtro';
import GridProductos from '@/components/grid-productos/GridProductos';
import Paginator from '@/components/paginator/Paginator';
import useApiPrivate from '@/hooks/useApiPrivate';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import createProductService from '@/services/productService';

import './Buscar.css';

function Buscar() {
  useDocumentTitle('Buscar');

  const apiPrivate = useApiPrivate();
  const productService = createProductService(apiPrivate);

  const { showMenu, handleClose } = useOutletContext();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';

  const [productos, setProductos] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    size: 24, // response y request
    totalElements: 0, // solo response
    totalPages: 0, // solo response
    number: 0, // response y request
  });

  const [errMsg, setErrMsg] = useState('');

  const [opcionesCategoria, setOpcionesCategoria] = useState([]);
  const [opcionesEstado, setOpcionesEstado] = useState({});
  const [opcionesRangoPrecios, setOpcionesRangoPrecios] = useState({
    min: 0,
    max: 0,
  });
  const [filtros, setFiltros] = useState({
    categoriaId: '',
    estado: '',
    precioMaximo: '',
  });

  useEffect(() => {
    const loadFiltrosData = async () => {
      try {
        const [categorias, estadosValor, rangoPrecios] = await Promise.all([
          productService.getCategoriasProductos(),
          productService.getEstadosProducto(),
          productService.getRangoPrecios(),
        ]);
        setOpcionesCategoria(categorias);
        setOpcionesEstado(estadosValor);

        const rango = {
          min: Math.floor(rangoPrecios?.min || 0),
          max: Math.ceil(rangoPrecios?.max || 0),
        };
        setOpcionesRangoPrecios(rango);
        setFiltros((prev) => ({ ...prev, precioMaximo: rango.max }));
      } catch (err) {
        console.error('Error al cargar datos para filtros:', err);
      }
    };

    loadFiltrosData();
  }, []);

  useEffect(() => {
    const loadProductos = async () => {
      try {
        const params = {};
        if (filtros.categoriaId) params.categoriaId = filtros.categoriaId;
        if (filtros.estado) params.estadoMinimo = filtros.estado;
        if (filtros.precioMaximo) params.precioMaximo = filtros.precioMaximo;
        if (queryParam) params.texto = queryParam;

        // paginación
        params.size = pageInfo.size;
        params.page = pageInfo.number;

        const data = await productService.getProductos(params);

        const productosList = data._embedded?.productoResumenList || [];
        const page = data.page;

        setProductos(productosList);
        setPageInfo(page);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
        setErrMsg('Error al cargar los productos');
      }
    };

    loadProductos();
  }, [filtros, pageInfo.number, pageInfo.size, queryParam]);

  const handleFiltroChange = (key, value) => {
    setFiltros((prev) => ({ ...prev, [key]: value }));
    setPageInfo((prev) => ({ ...prev, number: 0 }));
  };

  const handlePageChange = (newPage) => {
    setPageInfo((prev) => ({ ...prev, number: newPage }));
  };

  const handleClearFiltros = () => {
    setFiltros({
      categoriaId: '',
      estado: '',
      precioMaximo: opcionesRangoPrecios?.max || '',
    });
    setPageInfo((prev) => ({ ...prev, number: 0 }));
  };

  return (
    <>
      <Container className="buscar-body py-5 mt-0">
        <Row style={{ '--bs-gutter-x': '2rem', '--bs-gutter-y': '2rem' }}>
          <Col
            xs={12}
            lg="auto"
            className="d-none d-lg-block mt-4 mt-lg-5 px-lg-3 buscar-sidebar-divider"
          >
            <Filtro
              opcionesCategoria={opcionesCategoria}
              opcionesEstado={opcionesEstado}
              opcionesRangoPrecios={opcionesRangoPrecios}
              filtros={filtros}
              onFiltroChange={handleFiltroChange}
              onClearFiltros={handleClearFiltros}
            />
          </Col>
          <Col xs={12} lg>
            <div className="buscar-content p-3">
              {errMsg && <Alert variant="danger">{errMsg}</Alert>}

              <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-end pb-3 mb-5 border-bottom gap-3">
                <h2 className="m-0">
                  {pageInfo.totalElements} resultados{' '}
                  {queryParam ? `para "${queryParam}"` : ''}
                </h2>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted text-nowrap">Mostrar:</span>
                  <Form.Select
                    aria-label="Items por página"
                    value={pageInfo.size}
                    onChange={(e) => {
                      setPageInfo((prev) => ({
                        ...prev,
                        size: e.target.value,
                        number: 0,
                      }));
                    }}
                    style={{ width: 'auto' }}
                  >
                    <option value="12">12 ítems</option>
                    <option value="24">24 ítems</option>
                    <option value="48">48 ítems</option>
                  </Form.Select>
                </div>
              </div>
              <GridProductos
                className="mt-lg-5 mb-5"
                productos={productos}
                tipoCard={TIPO_CARD.BUSCAR}
              />
              <Paginator pageInfo={pageInfo} onPageChange={handlePageChange} />
            </div>
          </Col>
        </Row>
      </Container>

      {/* offcanvas lateral para pantallas pequenas */}
      <Offcanvas
        show={showMenu}
        onHide={handleClose}
        placement="start"
        className="d-lg-none p-3"
      >
        <Offcanvas.Header closeButton className="mt-1">
          <Offcanvas.Title>Filtros</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0 m-0 d-flex justify-content-center">
          <Filtro
            opcionesCategoria={opcionesCategoria}
            opcionesEstado={opcionesEstado}
            filtros={filtros}
            onFiltroChange={handleFiltroChange}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Buscar;
