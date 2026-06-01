const mapAuthResponse = (data, extras = {}) => ({
  usuario: data.usuario.id,
  nombre: data.usuario.nombre,
  roles: data.usuario.roles.split(','),
  accessToken: data.accessToken,
  ...extras,
});

export default mapAuthResponse;
