// factoría
const createProductService = (apiInstance) => ({
  getProduct: async (id) => {
    try {
      const response = await apiInstance.get(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        'Error al obtener el producto:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  createProduct: async (data) => {
    try {
      const response = await apiInstance.post(`/productos`, data);
      return response.data;
    } catch (error) {
      console.error(
        'Error al crear el producto:',
        error.response?.data || error.message
      );
      throw error;
    }
  },
});

export default createProductService;
