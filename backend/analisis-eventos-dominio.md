# Analisis de eventos de dominio y participantes

## Objetivo

Identificar a que eventos de dominio debe suscribirse cada microservicio para mantener consistencia
cuando existe informacion redundante entre contextos.

## Redundancias detectadas en el codigo actual

| Microservicio | Dato redundante local                                                    | Fuente canonica sugerida             |
| ------------- | ------------------------------------------------------------------------ | ------------------------------------ |
| usuarios      | `numeroCompras`, `numeroVentas` en `Usuario`                             | compraventa (hechos de compra/venta) |
| compraventa   | `nombreVendedor`, `nombreComprador` en `Compraventa`                     | usuarios                             |
| compraventa   | `titulo`, `precio`, `recogida` en `Compraventa`                          | productos                            |
| productos     | `Usuario` embebido/referenciado como vendedor (nombre, apellidos, email) | usuarios                             |

## Contrato RabbitMQ actual (estado verificado)

- Exchange compartido: `arso.bus`
- Compraventa publica: `arso.bus.usuarios.compraventa-creada`
- Usuarios consume por binding: `arso.bus.usuarios.#`
- Payload de tipo evento: usa campo `tipoEvento`

Conclusion: con ese routing y binding, usuarios puede recibir el evento de compraventa
correctamente.

## Eventos de dominio recomendados y participantes

| Evento de dominio                             | Productor                                      | Consumidores                      | Payload minimo recomendado                                              | Objetivo de consistencia                                                                 |
| --------------------------------------------- | ---------------------------------------------- | --------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `compraventa-creada`                          | compraventa                                    | usuarios, productos               | `idCompraventa`, `idProducto`, `idVendedor`, `idComprador`, `timestamp` | incrementar contadores en usuarios y marcar producto como no disponible/vendido          |
| `usuario-creado`                              | usuarios                                       | productos                         | `idUsuario`, `nombre`, `apellidos`, `email`, `timestamp`                | crear/actualizar replica de vendedor para que productos no dependa de llamadas sincronas |
| `usuario-modificado` (datos publicos)         | usuarios                                       | productos, compraventa (opcional) | `idUsuario`, `nombre`, `apellidos`, `email`, `timestamp`                | mantener nombres consistentes en proyecciones o snapshots editables                      |
| `usuario-deshabilitado`                       | usuarios                                       | productos, compraventa            | `idUsuario`, `motivo`, `timestamp`                                      | impedir nuevas publicaciones/operaciones con usuarios inactivos                          |
| `producto-creado`                             | productos                                      | compraventa (opcional)            | `idProducto`, `idVendedor`, `precio`, `estado`, `timestamp`             | alimentar cache/proyecciones de lectura en compraventa                                   |
| `producto-modificado`                         | productos                                      | compraventa (opcional)            | `idProducto`, `precio`, `estado`, `recogida`, `timestamp`               | evitar divergencia de datos de producto replicados en otras vistas                       |
| `producto-no-disponible` o `producto-vendido` | productos (o compraventa como origen de hecho) | compraventa, busqueda/listados    | `idProducto`, `causa`, `timestamp`                                      | evitar nuevas compras sobre producto ya vendido                                          |

## Suscripciones por microservicio

### usuarios

- Suscribirse a `compraventa-creada`.
- Efecto: actualizar `numeroCompras` del comprador y `numeroVentas` del vendedor.

### productos

- Suscribirse a `compraventa-creada`.
- Efecto: marcar producto como no disponible.
- Suscribirse tambien a `usuario-creado` y `usuario-modificado` para mantener consistente la
  informacion del vendedor en su propio contexto.

### compraventa

- Publicar `compraventa-creada` tras persistir la compraventa.

## Notas de implementacion

- Usar idempotencia en consumidores (procesamiento por `idEvento` o `idCompraventa`) para evitar
  dobles actualizaciones.
- Confirmar `ack` solo cuando el manejador termine correctamente.
