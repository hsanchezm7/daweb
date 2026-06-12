# TODO

## adicional

- [ ] **paginación en  MisProductos, MisCompras y MisVentas**

- [ ] **permitir ordenar productos en Buscar**

- [ ] **búsqueda con query**

- [X] **url de imágenes para todos los productos (seeder.py backend)**

- [ ] **ocultar apartado Administración de Menu si no admin**

- [X] **terminar Header**

- [ ] **terminar Footer**

- [X] **hacer /404 y /unauthorized**

Estructura de vistas, rutas y componentes basada en el modelo de **PcComponentes**.

---

## vistas y rutas

### vistas públicas

Accesibles para todos los visitantes.

- [ ] **Inicio (`/`)**: 
    - Barra de búsqueda centralizada.
    - ~~Secciones destacadas de productos.~~
    - Acceso al menú lateral de usuario si está logueado.
    
- [ ] ~~**Buscar (`/buscar`)**: ~~ 
    - **TODO**: Recibe el parámetro `q` del buscador.
    - ~~Sidebar lateral izquierdo con filtros (categorías, precio, estado).~~
    - ~~Grid de resultados con `CardProducto`.~~
    
- [x] **Ver Producto (`/producto/:id`)**: 
    - ~~Detalle técnico del producto con imagen.~~
    - ~~Botón de "Comprar" (solo visible si el usuario no es el dueño). Si no está registrado,
    redirige a "Login/Registro"~~
    
- [X] ~~**Login (`/iniciar-sesion`)**: Formulario de acceso.~~

- [X] ~~**Registro (`/registro`)**: Formulario de alta.~~

### vistas de usuario (privadas)

- [X] ~~**Mi Cuenta (`/mi-cuenta`)**: Vista para editar los datos personales del perfil.~~

- [X] ~~**Mis Productos (`/mis-productos`)**:~~ ~~**TODO**: arreglar backend para permitir productos y filtrar por usuario vendedor.~~ 
    - ~~Botón para "Crear Producto"~~.
    - ~~Debe permitir para cada producto: "Editar" y "Eliminar". Implementar con botones o iconos, por ejemplo.~~
    - ~~Pestañas para: *En venta*, *Vendidos* (opcional).~~
    
- [X] ~~**Nuevo Producto (`/nuevo-producto`)**: Formulario de creación.~~

- [ ] **Editar Producto (`/editar-producto/:id`)**: Variante del formulario de creación con datos precargados.

### vistas de administración (admin)

Sección de gestión global dentro del menú de usuario.

- [X] ~~**Usuarios Registrados (`/admin/usuarios`)**: Tabla de gestión de usuarios.~~
- [X] ~~**Compraventas Realizadas (`/admin/transacciones`)**~~.

---

## componentes React

### navegación y estructura

- [ ] **Navbar Principal**:
    - ~~Logo.~~
    - Buscador integrado (redirige a `/buscar`).
    - Icono de usuario con trigger para menú lateral.
    
- [X] ~~**Menú de Usuario (Sidebar)**:~~ ~~**TODO**: offcanvas~~.
    - ~~Reutilizable: Se muestra a la derecha en el Inicio y a la izquierda en las vistas de gestión.~~
    - ~~Secciones y enlaces:~~ 
        - ~~Productos: Mis productos, Historial de pedidos.~~ 
        - ~~Mi cuenta: Datos de cuenta.~~
        - ~~Administración (si es admin).~~
        - ~~Cerrar sesión.~~
    
- [X] **Footer**: Enlaces de interés, RRSS y copyright.

### producto

- [X] ~~**Card Producto**: Visualización de imagen, precio, nombre y etiquetas de estado.~~ **TODO**: Badge de estado del producto.

- [X] ~~**Menú de Filtros**: Sidebar con Slider de precio (Bootstrap Range) y Checkboxes de categorías.~~ 

### formulario

- [X] ~~**Formulario Producto**: Componente dual para creación y edición (recibe `initialData` como prop).~~

- [X] ~~**Formulario de Perfil**: Edición de datos de usuario.~~

---

## notas

- [X] ~~**Ruteo**: Las rutas deben gestionarse con `react-router-dom`. Instalar.~~
