import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

import { TIPO_CARD } from '@/components/card-producto/CardProducto';
import GridProductos from '@/components/grid-productos/GridProductos';
import useApiPrivate from '@/hooks/useApiPrivate';
import useAuth from '@/hooks/useAuth';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import createCompraventaService from '@/services/compraventaService';
import createProductService from '@/services/productService';

import './MisCompras.css';

function MisCompras() {
  useDocumentTitle('Mis compras');

  const apiPrivate = useApiPrivate();
  const compraventaService = createCompraventaService(apiPrivate);
  const productService = createProductService();

  const [MisCompras, setMisCompras] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    size: 0,
    totalElements: 0,
    totalPages: 0,
    number: 0,
  });

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    const loadMisCompras = async () => {
      try {
        const params = {}
        const data = await compraventaService.getCompras(params);

        const compras = data._embedded?.compraventaResumenList || [];
        const pageInfo = data.page;

        const promises = compras.map(async (v) => {
          const producto = await productService.getProduct(v.idProducto);
          return producto;
        });

        const productos = await Promise.all(promises);

        setMisCompras(productos);
        setPageInfo(pageInfo);
      } catch (error) {
        console.error('Error al cargar las compras:', error);
        setErrMsg('Error al cargar las compras');
      }
    };

    loadMisCompras();
  }, []);

  return (
    <div className="mis-compras">
      <div className="mb-5">
        <h2 className="mb-2">Mis compras</h2>
        <p className="text-muted m-0">Consulta tus compras con otros usuarios de la plataforma.</p>
      </div>

      {errMsg && <Alert variant="danger">{errMsg}</Alert>}

      <GridProductos
        className="compras-grid"
        productos={MisCompras}
        tipoCard={TIPO_CARD.MIS_PRODUCTOS}
      />

    </div>
  );
}

export default MisCompras;
