const createCompraventaService = (apiInstance) => ({
  getCompraventas: async (params = {}) => {
    try {
      const response = await apiInstance.get(`/compraventas/`, { params });
      return response.data;
    } catch (error) {
      console.error(
        'Error al obtener todas las compraventas:',
        error.response?.data || error.message
      );
      throw error;
    }
  },
  getCompras: async (params = {}) => {
    try {
      const response = await apiInstance.get(`/compraventas/compras`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error al obtener todas las compraventas:',
        error.response?.data || error.message
      );
      throw error;
    }
  },
  getVentas: async (params = {}) => {
    try {
      const response = await apiInstance.get(`/compraventas/ventas`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error(
        'Error al obtener todas las compraventas:',
        error.response?.data || error.message
      );
      throw error;
    }
  },
  realizarCompra: async (idProducto) => {
    try {
      const response = await apiInstance.post(`/compraventas`, { idProducto });
      return response.data;
    } catch (error) {
      console.error(
        'Error al realizar la compra:',
        error.response?.data || error.message
      );
      throw error;
    }
  },
});

export default createCompraventaService;
