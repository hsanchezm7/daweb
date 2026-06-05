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

- [Node.js v20.20+](https://nodejs.org/) como entorno de ejecución.
- [npm](https://www.npmjs.com) o [Yarn](https://yarnpkg.com) como gestor de dependencias.

### Instalación

1. Clonar el repositorio

   ```sh
   git clone https://github.com/hsanchezm7/daweb
   ```

2. Entrar al directorio del cliente

   ```sh
   cd daweb/frontend
   ```

3. Instalar las dependencias

   ```sh
   npm install
   ```

4. Compilar y servir la aplicación

   ```sh
   npm run build && npm run preview
   ```

La previsualización estará disponible en `http://localhost:4173`.

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

<!-- USAGE EXAMPLES -->
## Uso

### Entorno de desarrollo

Si necesitas ejecutar la aplicación en modo desarrollo (con recarga en caliente), puedes utilizar:

```sh
npm run dev
```

Esto iniciará el servidor de desarrollo en `http://localhost:5173`.

### Estructura del proyecto

```text
daweb                     # Raíz del repositorio
├── docs                  # Documentación
├── frontend              # Cliente (UI)
│   ├── public            # Archivos estáticos
│   ├── src               # Código fuente del cliente
│   ├── package.json      # Módulos y dependencias
│   └── vite.config.js    # Configuración de Vite
└── backend               # Servidor
```

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>
