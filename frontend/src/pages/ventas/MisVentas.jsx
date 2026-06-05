import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

import { TIPO_CARD } from '@/components/card-producto/CardProducto';
import GridProductos from '@/components/grid-productos/GridProductos';
import useApiPrivate from '@/hooks/useApiPrivate';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import createCompraventaService from '@/services/compraventaService';
import createProductService from '@/services/productService';


import './MisVentas.css';

function MisVentas() {
  useDocumentTitle('Mis ventas');

  const apiPrivate = useApiPrivate();
  const compraventaService = createCompraventaService(apiPrivate);
  const productService = createProductService();

  const [MisVentas, setMisVentas] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    size: 0,
    totalElements: 0,
    totalPages: 0,
    number: 0,
  });

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    const loadMisVentas = async () => {
      try {
        const params = {}
        const data = await compraventaService.getVentas(params);

        const ventas = data._embedded?.compraventaResumenList || [];
        const pageInfo = data.page;

        const promises = ventas.map(async (v) => {
          const producto = await productService.getProduct(v.idProducto);
          return producto;
        });

        const productos = await Promise.all(promises);

        setMisVentas(productos);
        setPageInfo(pageInfo);
      } catch (error) {
        console.error('Error al cargar las ventas:', error);
        setErrMsg('Error al cargar las ventas');
      }
    };

    loadMisVentas();
  }, []);

  return (
    <div className="mis-ventas">
      <div className="mb-5">
        <h2 className="mb-2">Mis ventas</h2>
        <p className="text-muted m-0">Consulta tus productos vendidos.</p>
      </div>

      {errMsg && <Alert variant="danger">{errMsg}</Alert>}

      <GridProductos
        className="ventas-grid"
        productos={MisVentas}
        tipoCard={TIPO_CARD.MIS_PRODUCTOS}
      />

    </div>
  );
}

export default MisVentas;
