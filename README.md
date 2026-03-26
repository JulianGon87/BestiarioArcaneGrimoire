# Arcane Grimoire 🐉

**Arcane Grimoire** es una aplicación web interactiva o SPA (Single Page Application) construida con **Vue 3**. Detrás de su temática inspirada en el rol (Dungeons & Dragons 5e), el proyecto sirve como una **demostración técnica** de mis habilidades en el desarrollo Frontend moderno, la gestión compleja de estado, el consumo de APIs externas y la visualización de datos.

## 🎯 El propósito del proyecto
Este proyecto fue diseñado como una pieza central para mi portafolio. Mi objetivo no era solo hacer una web visualmente atractiva, sino resolver problemas reales de arquitectura y UX. A través de este grimorio, demuestro mi capacidad para estructurar una aplicación escalable, separar la lógica de negocio de la interfaz, y manejar la persistencia y manipulación de datos en el cliente.

## 🛠️ Stack Tecnológico
- **Core:** Vue 3 (Composition API, `<script setup>`)
- **Estilos:** Tailwind CSS (Custom themes, utility-first)
- **Gestor de Estado:** Pinia + `pinia-plugin-persistedstate`
- **Enrutamiento:** Vue Router (Rutas anidadas, parámetros dinámicos)
- **Visualización de Datos:** D3.js
- **Iconografía:** FontAwesome
- **Fuentes de Datos:** RESTful API (Open5e)

## 💡 Habilidades Técnicas Demostradas

### 1. Arquitectura y Reusabilidad (Composables & Components)
Para evitar código repetitivo y componentes gigantes, extraje la lógica de negocio hacia **Composables** (`useMonsters`, `useToast`). Construí componentes genéricos de UI altamente reutilizables y desacoplados (como un `<BaseModal>` que aprovecha la etiqueta `<Teleport>` nativa de Vue para escapar de la jerarquía del DOM).

### 2. Gestión de Estado Avanzada y Persistencia (Pinia)
Implementé **Pinia** manejar el estado global de la aplicación. Centralicé los datos consumidos de la API en el `bestiaryStore` y `spellStore` para actuar como un sistema de caché (evitando llamados de red innecesarios al navegar). Además, empleé persisted-state en el `characterStore` para guardar localmente interacciones del usuario (su "lista de hechizos preparados").

### 3. Consumo Integral de APIs (Servicios y Async/Await)
Consumo la API de Open5e usando un patrón de servicios estructurado (`monsterService.js`). La aplicación cuenta con manejo de errores (`try/catch/finally`), skeleton loaders mientras se cargan los hilos, y paralelización de peticiones (`Promise.all()`) para optimizar dramáticamente los tiempos de renderizado inicial de la dashboard.

### 4. Búsqueda y Filtros en Tiempo Real
Construí una interfaz de filtrado profundo que cruza múltiples valores (clases, escuelas de magia, nombre). Implementé técnicas como **Debouncing** para optimizar la carga computacional durante la captura de texto del usuario sobre bases de datos grandes en arreglos de JavaScript.

### 5. D3.js para la Visualización de Stats
Reconociendo que la data cruda (números) absorbe tiempo cognitivo, integré y montecolografícos dinámicos de barras usando **D3.js**. Utilizo escalas lineales matemáticas de dominio `0-20` (las puntuaciones estándar de D&D) inyectadas limpiamente mediante referencias del DOM en Vue.

### 6. Sistema Global de Notificaciones (Toasts)
Desarrollé un motor de eventos de notificación flotantes y reactivos para mejorar la retroalimentación UX ("Añadido a tus encuentros"), diseñando colas de eventos que desaparecen automáticamente y previenen el desbordamiento de pantalla.

---

## 🚀 Instalación Local

Si te interesa evaluar el código por ti mismo, clona este repositorio e instálalo de forma rápida:

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo
npm run dev
```

Te invito a navegar por la estructura de carpetas `src/`, inspeccionar mis tiendas de Pinia, o revisar cómo inyecto las gráficas en `src/components/MonsterStatsChart.vue`. ¡Cualquier feedback técnico es más que bienvenido!
