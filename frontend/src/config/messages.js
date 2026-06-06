export const VALIDATION_MESSAGES = {
  REQUIRED: 'Por favor, completa este campo',
  PASSWORD_MISMATCH: 'Las contraseñas no coinciden',
  PHONE: {
    INVALID_COUNTRY: 'Introduce un código de país válido',
    TOO_SHORT: 'El número es demasiado corto',
    TOO_LONG: 'El número es demasiado largo',
    INVALID: 'Introduce un número de teléfono válido',
  },
  PRECIO_NEGATIVO: 'El precio del producto no puede ser negativo',
  INVALID_URL: 'Por favor, introduce una URL válida',
};

export const AUTH_MESSAGES = {
  LOGIN_ERROR: 'El email o la contraseña son incorrectos',
  SERVER_ERROR: 'No se ha podido conectar con el servidor',
  REGISTER_SUCCESS: 'Registro exitoso',
};

export const ACCOUNT_MESSAGES = {
  UPDATE_SUCCESS: 'Tus datos se han actualizado correctamente',
  UPDATE_ERROR: 'No se han podido guardar los cambios',
};

export const getPhoneErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'INVALID_COUNTRY_CODE':
      return VALIDATION_MESSAGES.PHONE.INVALID_COUNTRY;
    case 'TOO_SHORT':
      return VALIDATION_MESSAGES.PHONE.TOO_SHORT;
    case 'TOO_LONG':
      return VALIDATION_MESSAGES.PHONE.TOO_LONG;
    default:
      return VALIDATION_MESSAGES.PHONE.INVALID;
  }
};
