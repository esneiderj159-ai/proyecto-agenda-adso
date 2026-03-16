<<<<<<< HEAD
// Archivo: src/api.js
// Capa de acceso a datos de Agenda ADSO (llamados a la API REST con JSON Server).

// Importamos la URL base desde config.js
// Así si cambia el puerto o la ruta, solo se modifica en un solo lugar
import { API_BASE_URL } from "./config";

// Función GET: obtener la lista completa de contactos desde la API
export async function listarContactos() {
  // Hacemos un GET a la URL base (devuelve el array de contactos)
  const res = await fetch(API_BASE_URL);
  // Si la respuesta no es correcta (código 4xx o 5xx), lanzamos un error
  if (!res.ok) throw new Error("Error al listar contactos");
  // Parseamos el JSON y lo retornamos
  return res.json();
}

// Función POST: crear un nuevo contacto en la API
export async function crearContacto(data) {
  // Hacemos un POST a la URL base enviando el objeto como JSON
=======
// Importamos la URL base desde config.js
import { API_BASE_URL } from "./config";

// Función GET: listar contactos (READ)
export async function listarContactos() {
  // Hacemos un GET a la URL base (lista de contactos)
  const res = await fetch(API_BASE_URL);

  // Si la respuesta no es correcta (código 4xx o 5xx), lanzamos un error
  if (!res.ok) throw new Error("Error al listar contactos");

  // Parseamos el JSON y lo retornamos (devuelve un array de contactos)
  return res.json();
}

// Función POST: crear un nuevo contacto (CREATE)
export async function crearContacto(data) {
  // Hacemos un POST a la URL base con el objeto recibido
>>>>>>> 6e8b401 (clase 11_V9_ADSO)
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // Indicamos que el body es JSON
    body: JSON.stringify(data), // Convertimos el objeto JavaScript a JSON
  });
<<<<<<< HEAD
  // Validamos la respuesta
  if (!res.ok) throw new Error("Error al crear el contacto");
  // Devolvemos el contacto creado que regresa la API (incluye el id generado)
  return res.json();
}

// Función DELETE: eliminar un contacto por su id
export async function eliminarContactoPorId(id) {
  // Hacemos un DELETE a /contactos/:id usando la URL base
  const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
  // Validamos la respuesta
  if (!res.ok) throw new Error("Error al eliminar el contacto");
  // Retornamos true indicando que la eliminación fue exitosa
=======

  // Validamos la respuesta
  if (!res.ok) throw new Error("Error al crear el contacto");

  // Devolvemos el contacto creado que regresa la API (incluye el id)
  return res.json();
}

// Función PUT: actualizar un contacto existente (UPDATE)
export async function actualizarContacto(id, data) {
  // Hacemos un PUT a /contactos/:id usando la URL base
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" }, // Indicamos que el body es JSON
    body: JSON.stringify(data), // Enviamos el contacto actualizado
  });

  // Validamos la respuesta
  if (!res.ok) throw new Error("Error al actualizar el contacto");

  // Devolvemos el contacto actualizado que regresa la API
  return res.json();
}

// Función DELETE: eliminar contacto por id (DELETE)
export async function eliminarContactoPorId(id) {
  // Hacemos un DELETE a /contactos/:id usando la URL base
  const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });

  // Validamos la respuesta
  if (!res.ok) throw new Error("Error al eliminar el contacto");

  // Devolvemos true indicando éxito
>>>>>>> 6e8b401 (clase 11_V9_ADSO)
  return true;
}