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
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // Indicamos que el body es JSON
    body: JSON.stringify(data), // Convertimos el objeto JavaScript a JSON
  });
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
  return true;
}