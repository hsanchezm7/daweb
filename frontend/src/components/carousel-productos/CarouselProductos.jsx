import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import CardProducto from '@/components/card-producto/CardProducto';

import './CarouselProductos.css';

function CarouselProductos({ productos = [], titulo = '' }) {
  if (productos.length === 0) return null;

  return (
    <div className="carousel-productos">
      {titulo && <h2 className="carousel-productos-titulo">{titulo}</h2>}

      <div className="card-wrapper">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop={true}
          speed={700}
          spaceBetween={30}
          autoplay={{
            delay: 5000,
          }}
          slidesPerView={1}
          navigation={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            576: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
        >
          {productos.map((producto) => (
            <SwiperSlide key={producto.id}>
              <CardProducto producto={producto} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default CarouselProductos;
