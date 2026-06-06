<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?logo=bootstrap&logoColor=white)

<!-- PROJECT LOGO -->
<div align="center">
  <img src="docs/figures/swapit-github.svg" alt="swapIt logo">

  <h3 align="center">swapIt</h3>

  <p align="center">
    Prácticas de Desarrollo de Aplicaciones Web. Facultad de Informática. Universidad de Murcia.
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Contenidos</summary>
  <ol>
    <li>
      <a href="#acerca-del-proyecto">Acerca del proyecto</a>
    </li>
    <li>
      <a href="#inicio-rápido">Inicio rápido</a>
      <ul>
        <li><a href="#requisitos">Requisitos</a></li>
        <li><a href="#instalación">Instalación</a></li>
      </ul>
    </li>
    <li><a href="#uso">Uso</a></li>
    <li><a href="#estructura-del-proyecto">Estructura del proyecto</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Acerca del proyecto

**swapIt** es una aplicación web de frontend desarrollada con React y Vite que proporciona la interfaz de usuario para una plataforma de compraventa de productos.

Este cliente web ofrece a los usuarios una interfaz visual para navegar por el catálogo de productos disponibles, la posibilidad de realizar transacciones con otros usuarios y un panel de administración para gestionar sus compraventas.

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

<!-- GETTING STARTED -->
## Inicio rápido

### Requisitos

Para ejecutar el proyecto es necesario tener instalado:

- [Docker](https://www.docker.com/) y Docker Compose.
- El [backend](https://github.com/hsanchezm7/arso) de la aplicación, incluido automáticamente como submódulo.

### Instalación y Uso

1. Clonar el repositorio

   ```sh
   git clone --recurse-submodules https://github.com/hsanchezm7/daweb
   cd daweb
   ```

2. Levantar la plataforma

   ```sh
   docker compose up -d --build
   ```

3. Acceder al [cliente web](http://localhost:5173).

> [!NOTE]  
> La aplicación puede tardar varios minutos en iniciarse si es el primer arranque debido a la inicialización de datos.

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

<!-- USAGE EXAMPLES -->
## Uso

### Entorno de desarrollo

Para usar el entorno de desarrollo de Vite, consultar [frontend](frontend/).

### Estructura del proyecto

```text
daweb                     # Raíz del repositorio
├── docs                  # Documentación
├── frontend              # Cliente (UI)
│   ├── public            # Archivos estáticos
│   ├── src               # Código fuente del cliente
│   ├── package.json      # Módulos y dependencias
│   └── vite.config.js    # Configuración de Vite
└── backend               # Servidor (submódulo Git)
```

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

### Datos inicializados

Consultar [seeder](backend/seeder).
