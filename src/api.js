const API = "http://localhost:3002/contactos";

// Listar todos los contactos
export async function listarContactos() {
  const res = await fetch(API);
  if (!res.ok) throw new Error("Error al listar contactos");
  return res.json();
}

// Crear un nuevo contacto
export async function crearContacto(data) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear contacto");
  return res.json(); // JSON Server genera id automáticamente
}

// Eliminar contacto por ID
export async function eliminarContactoPorId(id) {
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar contacto");
  return true;
}