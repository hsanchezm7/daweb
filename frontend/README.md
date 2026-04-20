# frontend (React + Bootstrap)

Estructura de vistas, rutas y componentes basada en el modelo de **PcComponentes**.

---

## vistas y rutas

### vistas públicas

Accesibles para todos los visitantes.

- [ ] **Inicio (`/`)**: 
    - Barra de búsqueda centralizada.
    - Secciones destacadas de productos.
    - Acceso al menú lateral de usuario si está logueado.
    
- [ ] **Buscar (`/buscar`)**: 
    - Recibe el parámetro `q` del buscador.
    - Sidebar lateral izquierdo con filtros (categorías, precio, estado).
    - Grid de resultados con `CardProducto`.
    
- [ ] **Ver Producto (`/producto/:id`)**: 
    - Detalle técnico del producto con imagen.
    - Botón de "Comprar" (solo visible si el usuario no es el dueño). Si no está registrado,
    redirige a "Login/Registro"
    
- [ ] **Login (`/iniciar-sesion`)**: Formulario de acceso.

- [ ] **Registro (`/registro`)**: Formulario de alta.

### vistas de usuario (privadas)

Requieren autenticación. Usar [React Router Private Routes](https://www.robinwieruch.de/react-router-private-routes/).

- [ ] **Mi Cuenta (`/mi-cuenta`)**: Vista para editar los datos personales del perfil.

- [ ] **Mis Productos (`/mis-productos`)**: 
    - Botón para "Crear Producto".
    - Debe permitir para cada producto: "Editar" y "Eliminar". Implementar con botones o iconos, por ejemplo.
    - Pestañas para: *En venta*, *Vendidos* (opcional).
    
- [ ] **Nuevo Producto (`/nuevo-producto`)**: Formulario de creación.

- [ ] **Editar Producto (`/editar-producto/:id`)**: Variante del formulario de creación con datos precargados.

### vistas de administración (admin)

Sección de gestión global dentro del menú de usuario.

- [ ] **Usuarios Registrados (`/admin/usuarios`)**: Tabla de gestión de usuarios.
- [ ] **Compraventas Realizadas (`/admin/transacciones`)**.

---

## componentes React

### navegación y estructura

- [ ] **Navbar Principal**:
    - Logo.
    - Buscador integrado (redirige a `/buscar`).
    - Icono de usuario con trigger para menú lateral.
    
- [ ] **Menú de Usuario (Sidebar)**:
    - Reutilizable: Se muestra a la derecha en el Inicio y a la izquierda en las vistas de gestión.
    - Secciones y enlaces: 
        - Productos: Mis productos, Historial de pedidos. 
        - Mi cuenta: Datos de cuenta.
        - Administración (si es admin). 
        - Cerrar sesión.
    
- [ ] **Footer**: Enlaces de interés, RRSS y copyright.

### producto

- [ ] **Card Producto**: Visualización de imagen, precio, nombre y etiquetas de estado.

- [ ] **Menú de Filtros**: Sidebar con Slider de precio (Bootstrap Range) y Checkboxes de categorías.

### formulario

- [ ] **Formulario Producto**: Componente dual para creación y edición (recibe `initialData` como prop).

- [ ] **Formulario de Perfil**: Edición de datos de usuario.

---

## notas

- [ ] **Ruteo**: Las rutas deben gestionarse con `react-router-dom`. Instalar.
