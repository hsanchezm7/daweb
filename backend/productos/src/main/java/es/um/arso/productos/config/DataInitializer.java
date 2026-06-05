package es.um.arso.productos.config;

import es.um.arso.productos.modelo.Categoria;
import es.um.arso.productos.modelo.EstadoProducto;
import es.um.arso.productos.modelo.Producto;
import es.um.arso.productos.modelo.Usuario;
import es.um.arso.productos.repositorio.RepositorioCategorias;
import es.um.arso.productos.repositorio.RepositorioProductos;
import es.um.arso.productos.repositorio.RepositorioUsuarios;

import java.util.Random;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);
    private static final Random random = new Random();

    private final RepositorioCategorias repositorioCategorias;
    private final RepositorioProductos repositorioProductos;
    private final RepositorioUsuarios repositorioUsuarios;

    public DataInitializer(
            RepositorioCategorias repositorioCategorias,
            RepositorioProductos repositorioProductos,
            RepositorioUsuarios repositorioUsuarios) {
        this.repositorioCategorias = repositorioCategorias;
        this.repositorioProductos = repositorioProductos;
        this.repositorioUsuarios = repositorioUsuarios;
    }

    public void initializeData(String adminId) {
        long numCategorias = repositorioCategorias.count();
        if (numCategorias > 0) {
            log.info("Base de datos ya contiene datos. Omitiendo inicialización.");
            return;
        }

        Usuario admin = repositorioUsuarios.findById(adminId).orElse(null);
        if (admin == null) {
            log.warn("Usuario admin con id {} no encontrado. No se puede inicializar datos.", adminId);
            return;
        }

        log.info(
                "Inicializando base de datos con datos de prueba para admin id={}, email={}",
                admin.getId(),
                admin.getEmail());

        // Crear categorías
        Categoria electronica = new Categoria("Electrónica");
        electronica.setDescripcion("Dispositivos electrónicos");
        electronica.setRuta("/electronica");
        electronica = repositorioCategorias.save(electronica);

        Categoria libros = new Categoria("Libros");
        libros.setDescripcion("Literatura y no ficción");
        libros.setRuta("/libros");
        libros = repositorioCategorias.save(libros);

        Categoria ropa = new Categoria("Ropa");
        ropa.setDescripcion("Prendas de vestir");
        ropa.setRuta("/ropa");
        ropa = repositorioCategorias.save(ropa);

        log.info("Categorías creadas: Electrónica, Libros, Ropa");

        // Crear productos para Electrónica
        crearProducto(
                "Smartphone X",
                "Teléfono inteligente de última generación",
                599.99,
                EstadoProducto.BUEN_ESTADO,
                electronica,
                true,
                admin,
                null);
        crearProducto(
                "Laptop Pro",
                "Portátil de alto rendimiento",
                1299.99,
                EstadoProducto.ACEPTABLE,
                electronica,
                false,
                admin,
                null);
        crearProducto(
                "Auriculares Bluetooth",
                "Auriculares inalámbricos premium",
                199.99,
                EstadoProducto.COMO_NUEVO,
                electronica,
                true,
                admin,
                null);

        // Crear productos para Libros
        crearProducto(
                "Clean Code",
                "Manual de programación limpia",
                49.99,
                EstadoProducto.NUEVO,
                libros,
                true,
                admin,
                null);
        crearProducto(
                "El Quijote",
                "Obra maestra de la literatura española",
                25.99,
                EstadoProducto.PARA_PIEZAS_O_REPARAR,
                libros,
                true,
                admin,
                null);
        crearProducto(
                "1984",
                "Novela de ciencia ficción distópica",
                15.99,
                EstadoProducto.COMO_NUEVO,
                libros,
                true,
                admin,
                null);

        // Crear productos para Ropa
        crearProducto(
                "Camiseta Básica",
                "Camiseta de algodón 100%",
                19.99,
                EstadoProducto.PARA_PIEZAS_O_REPARAR,
                ropa,
                true,
                admin,
                "https://neffelle.com/cdn/shop/files/IMG_7830.jpg?v=1753264724&width=1946");
        crearProducto(
                "Pantalón Vaquero Levis",
                "Pantalón vaquero azul oscuro",
                59.99,
                EstadoProducto.COMO_NUEVO,
                ropa,
                false,
                admin, "https://www.ouka.es/wp-content/uploads/2025/12/pantalon-vaquero-hombre-levis-511-slim-take-it-from-the-top-azul-2.png");
        crearProducto(
                "Sudadera Adidas", "Sudadera azul tribanda", 49.99, EstadoProducto.NUEVO, ropa, true, admin, "https://media.gotrendier.mx/media/p/2022/05/14/n_96f1b564-d3f5-11ec-a83b-02e73d0d4401.jpeg");

        log.info("9 productos creados (3 por categoría). Inicialización completada.");
    }

    private void crearProducto(
            String titulo,
            String descripcion,
            Double precio,
            EstadoProducto estado,
            Categoria categoria,
            boolean envioDisponible,
            Usuario vendedor,
            String urlImagen) {
        Producto producto = new Producto(
                titulo,
                descripcion,
                precio,
                estado,
                categoria,
                envioDisponible,
                vendedor,
                urlImagen);
        producto.setDisponible(true);
        producto.setVisualizaciones(random.nextInt(501));
        repositorioProductos.save(producto);
        log.debug("Producto creado: titulo={}, categoria={}", titulo, categoria.getNombre());
    }
}
