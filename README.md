# P1 - Programación Web 2: Sistema de Gestión de Productos (Svelte 5)

Este proyecto es una Single Page Application (SPA) desarrollada con **Svelte 5** y **Vite**, conectada a un backend en Node.js con persistencia en Redis. Se han implementado todas las funcionalidades mínimas y los tres bloques de puntos extra de Svelte 5.

## 🚀 Instalación y Ejecución

### 1. Requisitos previos
* Docker Desktop (ejecutándose)
* Node.js v20 o superior

### 2. Backend (Entorno Docker)
Para asegurar la conexión con la base de datos Redis sin instalaciones locales complejas, se recomienda este flujo:
1. Abrir una terminal en la carpeta `backend`.
2. Ejecutar los siguientes comandos:
   ```powershell
   # 1. Levantar el contenedor de la base de datos
   docker run -d --name redis-server -p 6379:6379 redis
   
   # 2. Construir la imagen de la aplicación Node.js
   docker build -t productos-backend .
   
   # 3. Arrancar el backend vinculando el host de Redis
   docker run -it -p 3000:3000 --add-host=redis:host.docker.internal productos-backend
   ```

### 3. Frontend (Svelte)
1. Abrir una nueva terminal en la carpeta `frontend`.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```
4. Acceder a [http://localhost:5173](http://localhost:5173) en el navegador.

## 🏗️ Arquitectura y Características

### Estructura del Proyecto
* **`frontend/`**: Código fuente de la aplicación Svelte.
    * **`services/`**: Lógica de negocio y llamadas API.
    * **`pages/`**: Componentes de UI (Login, Productos, Perfil).
    * **`components/`**: Componentes reutilizables (Navbar, Form).
* **`backend/`**: API REST en Node.js.
    * **`routes/`**: Endpoints de la API.
    * **`services/`**: Lógica de negocio y conexión a Redis.

### Funcionalidades Implementadas
* **Autenticación**: Registro e inicio de sesión con JWT.
* **Gestión de Productos**: CRUD completo.
* **Roles**: Distinción entre Admin (gestión total) y User (solo lectura).
* **Persistencia**: Base de datos Redis.

### Puntos Extra Svelte 5
Se han implementado las tres categorías de puntos extra solicitadas:

1. **Reacciones (Reactivity)**:
   * Uso extensivo de `$state` para el estado local de los componentes.
   * Uso de `$effect` en `auth.svelte.js` para sincronizar el estado global con `localStorage` (persistencia de sesión).

2. **Transiciones y Animaciones**:
   * **`transition:fade`**: Animación suave al aparecer/desaparecer modales y mensajes de alerta.
   * **`transition:fly`**: Animación de entrada para los elementos de la tabla de productos.
   * **`animate:flip`**: Animación de reordenamiento automático cuando se filtran o ordenan los productos.

3. **Componentes Avanzados**:
   * **`$slots`**: Uso de slots en el componente `Navbar` para permitir la inyección de contenido dinámico (como el botón de perfil o el título).
   * **`$spread`**: Uso en `ProductForm.svelte` para fusionar props de configuración con el objeto de estado del formulario, simplificando la lógica de edición.