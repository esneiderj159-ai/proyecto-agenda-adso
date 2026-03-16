# Agenda ADSO — Gestión de Contactos
# INTEGRANTE: ANGEL VILLADA, DIEGO BERMUDEZ, DIEGO ROJAS, SNEIDER JIMENEZ 


    
Proyecto formativo de gestión de contactos desarrollado en ReactJS + Vite + Tailwind CSS + json-server.

---

## Tecnologías utilizadas

- **ReactJS** — librería principal para construir la interfaz de usuario
- **Vite** — herramienta de desarrollo y empaquetado rápido
- **Tailwind CSS** — framework de utilidades CSS para el diseño visual
- **json-server** — backend simulado que expone una API REST local
- **JavaScript ES6+** — lenguaje base con async/await para llamadas a la API

---

## Estructura del proyecto
```
src/
├── main.jsx                          # Punto de entrada, renderiza <App />
├── App.jsx                           # Componente raíz, maneja el estado global
├── api.js                            # Funciones para consumir la API (GET, POST, PUT, DELETE)
├── config.js                         # Configuración global (API_BASE_URL, APP_INFO)
└── components/
    ├── FormularioContacto.jsx        # Formulario para crear y editar contactos
    └── ContactoCard.jsx              # Tarjeta visual de cada contacto
```

---

## Funcionalidades implementadas

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

## Problemas encontrados y soluciones

### Pantalla en blanco al iniciar la app
**Causa:** el archivo `src/config.js` no existía. `App.jsx` y `api.js` lo importaban, causando un error de módulo no encontrado.  
**Solución:** se creó `src/config.js` exportando `API_BASE_URL` y `APP_INFO`.

### Funciones duplicadas en api.js
**Causa:** las cuatro funciones estaban definidas varias veces por copias y pegados accidentales.  
**Solución:** se limpió el archivo dejando solo una declaración de cada función.

### Error al guardar contactos
**Causa:** `config.js` apuntaba al puerto `3000` pero json-server estaba corriendo en el puerto `3002`.  
**Solución:** se actualizó `API_BASE_URL` a `http://localhost:3002/contactos`.

### El botón no mostraba el estado "Guardando..."
**Causa:** `setEnviando(true)` estaba dentro del bloque `try`, impidiendo que React re-renderizara antes del `await`. Además json-server responde tan rápido que el estado cambiaba antes de que el usuario lo viera.  
**Solución:** se movió `setEnviando(true)` antes del `try` y se agregó un delay de 1 segundo con `await new Promise(resolve => setTimeout(resolve, 1000))`.

---

## Instrucciones para ejecutar

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar el backend:
```bash
npx json-server --watch db.json --port 3002
```

3. Iniciar la app:
```bash
npm run dev
```

4. Abrir en el navegador: [http://localhost:5173](http://localhost:5173)

---

## Información académica

- **Programa:** Desarrollo Web — ReactJS
- **Ficha:** 3229209
- **Instructor:** Gustavo Adolfo Bolaños Dorado
- **Institución:** SENA