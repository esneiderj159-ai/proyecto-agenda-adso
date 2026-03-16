#  Agenda ADSO v10 PRO — Versión PRO de la Interfaz

> Dashboard con vistas separadas para crear y gestionar contactos

**Integrantes:** Angel Villada · Diego Bermúdez · Diego Rojas · Sneider Jiménez  
**Ficha:** 3229209 · **Instructor:** Gustavo Adolfo Bolaños Dorado · **SENA CTMA**

---

## ¿Qué es Agenda ADSO v10 PRO?

La versión 10 PRO transforma la aplicación de una sola página CRUD (v9) en un **dashboard profesional** con dos vistas independientes, un panel lateral informativo y un diseño visual moderno listo para portafolio. La lógica de negocio, las APIs y los componentes base se mantienen exactamente igual que en versiones anteriores.

| | v9 | v10 |
|---|---|---|
| Diseño | Una sola página | Dashboard tipo PRO |
| Vistas | Una vista unificada | "Crear" y "Contactos" separadas |
| Panel lateral | No tiene | Estadísticas + tips + info SENA |
| Router | No usa | No usa (estado local) |

---

##  Tecnologías utilizadas

- **ReactJS** — librería principal para construir la interfaz de usuario
- **Vite** — herramienta de desarrollo y empaquetado rápido
- **Tailwind CSS** — framework de utilidades CSS para el diseño visual
- **json-server** — backend simulado que expone una API REST local
- **JavaScript ES6+** — lenguaje base con async/await para llamadas a la API

---

##  Estructura del proyecto

```
src/
├── main.jsx                        # Punto de entrada, renderiza <App />
├── App.jsx                         # Componente raíz, maneja el estado global y las vistas
├── api.js                          # Funciones para consumir la API (GET, POST, PUT, DELETE)
├── config.js                       # Configuración global (API_BASE_URL, APP_INFO)
└── components/
    ├── FormularioContacto.jsx      # Formulario para crear y editar contactos
    └── ContactoCard.jsx            # Tarjeta visual de cada contacto
```

---

##  Funcionalidades implementadas

- Listar contactos al iniciar la app
- Crear contacto con validación de campos obligatorios
- Editar contacto precargando el formulario con sus datos
- Eliminar contacto con actualización inmediata de la vista
- Buscar en tiempo real por nombre, correo o etiqueta
- Ordenar contactos A-Z / Z-A
- Indicador de carga al obtener datos del servidor
- Mensajes de error cuando falla una operación de red
- Spinner y texto "Guardando..." visible al enviar el formulario

---

##  Nuevo layout — Dashboard PRO

### Estructura visual

- **Fondo**: degradado oscuro con clases Tailwind `bg-gradient-to-br` en tonos slate para aspecto profesional.
- **Barra superior fija**: logo "A" de Agenda ADSO, título del proyecto, ficha y referencia al SENA CTMA. Visible en todo momento.
- **Contenido principal**: grid de dos columnas.
  - Columna izquierda → tarjeta principal con el formulario o la lista.
  - Columna derecha → panel lateral con estadísticas y tips útiles.

---

##  Control de vistas con useState

La aplicación maneja dos vistas independientes **sin React Router**, usando un estado simple en `App.jsx`:

```js
const [vista, setVista] = useState("crear");

const irAVerContactos = () => {
  setVista("contactos");
  setContactoEnEdicion(null);
};

const irACrearContacto = () => {
  setVista("crear");
  setContactoEnEdicion(null);
  setBusqueda("");
};

const estaEnVistaCrear     = vista === "crear";
const estaEnVistaContactos = vista === "contactos";
```

### Vista "Crear"
Muestra únicamente el formulario para agregar nuevos contactos. La lista no es visible, manteniendo el foco en la creación. Se le pasa `contactoEnEdicion={null}` al formulario.

### Vista "Contactos"
Presenta el buscador, opciones de ordenamiento y la lista completa. Cuando se activa la edición de un contacto, el formulario aparece en la parte superior de esta vista.

### Botón dinámico
- En vista **crear** → muestra **"Ver contactos"**
- En vista **contactos** → muestra **"Volver a crear contacto"**

---

##  Flujo de edición (vista "Contactos")

1. El usuario hace clic en **Editar** dentro de una `ContactoCard`.
2. `onEditarClick(contacto)` guarda el contacto en el estado `contactoEnEdicion`.
3. El formulario aparece automáticamente en la parte superior en modo edición.
4. **Cancelar edición** ejecuta `onCancelarEdicion()` y oculta el formulario.
5. **Guardar cambios** utiliza `onActualizarContacto` y `actualizarContacto` (igual que en v9).

> El componente `FormularioContacto.jsx` no cambia su lógica interna. El mismo componente funciona para crear y para editar.

---

## Panel lateral

### Banner principal (morado)
- Título: **"Agenda ADSO – Dashboard"**
- Descripción del proyecto (CRUD con React + JSON Server)
- Estadística en tiempo real: **Contactos registrados** → `contactos.length`
- Mensaje motivacional para portafolio profesional

### Tarjeta de tips — Código Limpio
- **Nombres descriptivos**: un componente debe explicar su responsabilidad por su nombre.
- **Evita duplicación**: extrae funciones reutilizables compartidas entre componentes.
- **Comenta con intención**: explica el "por qué", no el "qué".
- **Archivos coherentes**: un componente = una responsabilidad clara.

### Tarjeta SENA CTMA – ADSO
Conecta el proyecto con la identidad institucional. Refuerza el valor de crear aplicaciones completas y bien documentadas como evidencia tangible de habilidades técnicas.

---

##  Problemas encontrados y soluciones

### Pantalla en blanco al iniciar la app
**Causa:** `src/config.js` no existía. `App.jsx` y `api.js` lo importaban, generando error de módulo no encontrado.  
**Solución:** Se creó `src/config.js` exportando `API_BASE_URL` y `APP_INFO`.

### Funciones duplicadas en api.js
**Causa:** Las cuatro funciones estaban definidas varias veces por copias y pegados accidentales.  
**Solución:** Se limpió el archivo dejando solo una declaración de cada función.

### Error al guardar contactos
**Causa:** `config.js` apuntaba al puerto `3000` pero json-server corría en el puerto `3002`.  
**Solución:** Se actualizó `API_BASE_URL` a `http://localhost:3002/contactos`.

### El botón no mostraba el estado "Guardando..."
**Causa:** `setEnviando(true)` estaba dentro del bloque `try`, impidiendo que React re-renderizara antes del `await`.  
**Solución:** Se movió `setEnviando(true)` antes del `try` y se agregó un delay de 1 segundo con `await new Promise(resolve => setTimeout(resolve, 1000))`.

---

##  Instrucciones para ejecutar

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el backend (json-server)
npx json-server --watch db.json --port 3002

# 3. Iniciar la app
npm run dev
```

Abrir en el navegador: [http://localhost:5173](http://localhost:5173)

---

##  Actividad — Personaliza tu dashboard

| # | Tarea | Descripción |
|---|---|---|
| 01 | Ajustar textos informativos | Modifica el panel lateral con tu ficha específica y número de grupo |
| 02 | Mensaje personal | Cambia el mensaje motivacional por uno propio que refleje tu visión |
| 03 | Nuevo indicador | Añade un indicador extra: contactos por categoría, favoritos, o último agregado |

### Evidencias a entregar

- Captura de pantalla — vista **"Crear contacto"** personalizada
- Captura de pantalla — vista **"Ver contactos"** con búsqueda activa
- Captura de pantalla — **panel lateral** con tus personalizaciones
- Enlace al repositorio GitHub con rama: `Clase_11B_Agenda_ADSO_v10_Version_PRO_UI`

---

##  ¿Por qué separar vistas?

- **Enfoque claro**: la pantalla de creación queda limpia, sin distracciones.
- **Gestión centralizada**: la pantalla de contactos se concentra en búsqueda, edición y eliminación.
- **Código más legible**: cada vista tiene una responsabilidad clara y bien definida.
- **Preparación para routing**: este patrón es el paso previo natural antes de implementar React Router.

---

##  Evolución del proyecto

```
v7 – v9  →  CRUD funcional + consumo de API con JSON Server
  v10    →  Dashboard PRO + vistas separadas + panel lateral + diseño portafolio
```

> Pequeños proyectos bien cuidados valen más que mil ideas sin código.  
> **Agenda ADSO es tu carta de presentación como desarrollador profesional.**

---

##  Información académica

| Campo | Detalle |
|---|---|
| Programa | Análisis y Desarrollo de Software (ADSO) |
| Módulo | Desarrollo Web — ReactJS |
| Ficha | 3229209 |
| Instructor | Gustavo Adolfo Bolaños Dorado |
| Institución | SENA — Centro Tecnológico de Manufactura Avanzada (CTMA) |
