/* define los productos que se van a destacar en la pantalla de inicio.
construye las listas de productos a partir de los parámetros que se
enviarán al endpoint */

// máximo de productos destacados por carousel (page)
const MAX_FEATURED_PRODUCTS = 10;

export const FEATURED_CAROUSELS = [
  {
    // productos más vistos
    id: 'populares',
    titulo: 'Los más vistos',
    params: {
      size: MAX_FEATURED_PRODUCTS,
      sort: 'visualizaciones,desc',
    },
  },
  {
    // productos más recientes
    id: 'novedades',
    titulo: 'Novedades',
    params: {
      size: MAX_FEATURED_PRODUCTS,
      sort: 'fechaPublicacion,desc',
    },
  },
  {
    // productos a estrenar
    id: 'destacados',
    titulo: 'Productos a estrenar',
    params: {
      size: MAX_FEATURED_PRODUCTS,
      estadoMinimo: 'NUEVO',
    },
  },
];
