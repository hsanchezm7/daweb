import { api } from './api';

// factoría
const createProductService = (apiInstance) => ({
  getProductos: async (params = {}) => {
    try {
      const response = await api.get(`/productos/`, { params });
      return response.data;
    } catch (error) {
      console.error(
        'Error al obtener todos los prodcutos:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  getProduct: async (id) => {
    try {
      const response = await api.get(`/productos/${id}`);
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

  updateProduct: async (id, data) => {
    try {
      const response = await apiInstance.put(`/productos/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(
        'Error al modificar el producto:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // rutas públicas
  getEstadosProducto: async () => {
    try {
      const response = await api.get(`/productos/estados`);
      return response.data;
    } catch (error) {
      console.error(
        'Error al obtener los estados de producto:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  getCategoriasProductos: async () => {
    try {
      const response = await api.get(`/productos/categorias`);
      return response.data;
    } catch (error) {
      console.error(
        'Error al obtener las categorias de productos:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  getRangoPrecios: async () => {
    try {
      const response = await api.get(`/productos/rango-precios`);
      return response.data;
    } catch (error) {
      console.error(
        'Error al obtener el rango de precios:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await apiInstance.delete(`/productos/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        'Error al eliminar el producto:',
        error.response?.data || error.message
      );
      throw error;
    }
  },
});

export default createProductService;
