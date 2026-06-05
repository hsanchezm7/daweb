/* eslint-disable no-unused-vars */
import { api } from './api';

const createCompraventaService = (apiInstance) => ({
  getCompraventas: async (params = {}) => {
    try {
      const response = await api.get(`/compraventas/`, { params });
      return response.data;
    } catch (error) {
      console.error(
        'Error al obtener todas las compraventas:',
        error.response?.data || error.message
      );
      throw error;
    }
  },
});

export default createCompraventaService;
