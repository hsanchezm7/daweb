import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import { FEATURED_CAROUSELS } from '@/config/featured';
import useApiPrivate from '@/hooks/useApiPrivate';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import createProductService from '@/services/productService';

import CarouselProductos from '../../components/carousel-productos/CarouselProductos';
import './Inicio.css';

function Inicio() {
  useDocumentTitle();

  const apiPrivate = useApiPrivate();
  const productService = createProductService(apiPrivate);

  const [carouselsData, setCarouselsData] = useState([]);

  useEffect(() => {
    const loadCarousels = async () => {
      try {   // asíncrono
        const promises = FEATURED_CAROUSELS.map(async (c) => {
          const data = await productService.getProductos(c.params);
          const productosList = data._embedded?.productoResumenList || [];
          return { c, productos: productosList };
        });

        const resultados = await Promise.all(promises);
        setCarouselsData(resultados);
      } catch (error) {
        console.error('Error al cargar los productos de los carouseles:', error);
      }
    };

    loadCarousels();
  }, []);

  return (
    <div className="pagina-inicio">
      <Container className="py-5">
        {carouselsData.map(({ c, productos }) => {
          if (productos.length === 0) return null;
          
          return (
            <div key={c.id} className="mb-4">
              <CarouselProductos
                productos={productos}
                titulo={c.titulo}
              />
            </div>
          );
        })}
      </Container>
    </div>
  );
}

export default Inicio;