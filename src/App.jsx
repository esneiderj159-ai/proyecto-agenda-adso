import React, { useEffect, useState } from "react";
import { listarContactos, crearContacto, eliminarContactoPorId } from "./api.js";
import FormularioContacto from "./components/FormularioContacto.jsx";
import ContactoCard from "./components/ContactoCard.jsx";

export default function App() {
  const [contactos, setContactos] = useState([]);

  useEffect(() => {
    listarContactos()
      .then((data) => setContactos(data))
      .catch((err) => console.error("Error al listar contactos:", err));
  }, []);

  const agregarContacto = async (form) => {
    try {
      const nuevo = await crearContacto(form);
      setContactos([...contactos, nuevo]);
    } catch (error) {
      console.error("Error al agregar contacto:", error);
    }
  };

  const eliminarContacto = async (id) => {
    try {
      await eliminarContactoPorId(id);
      setContactos(contactos.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="max-w-6xl mx-auto px-6 pt-8">
        <h1 className="text-4xl md:text-5xl font-black text-purple-600 text-center md:text-left">
          Agenda ADSO v5
        </h1>
      </header>

      <section className="max-w-6xl mx-auto px-6 mt-8">
        <FormularioContacto onAgregar={agregarContacto} />
      </section>

      <section className="max-w-6xl mx-auto px-6 mt-8 grid gap-4">
        {contactos.length === 0 ? (
          <p className="text-center text-gray-400">
            No hay contactos aún. ¡Agrega el primero!
          </p>
        ) : (
          contactos.map((contacto) => (
            <ContactoCard
              key={contacto.id}
              contacto={contacto}
              onEliminar={eliminarContacto}
            />
          ))
        )}
      </section>
    </main>
  );
}