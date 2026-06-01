// factoría
const createUserService = (apiInstance) => ({
  getUser: async (id) => {
    try {
      const response = await apiInstance.get(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        'Error al obtener el usuario:',
        error.response?.data || error.message
      );
      throw error;
    }
  },

  updateUser: async (id, data) => {
    try {
      const response = await apiInstance.put(`/usuarios/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(
        'Error al actualizar el usuario:',
        error.response?.data || error.message
      );
      throw error;
    }
  },
});

export default createUserService;
