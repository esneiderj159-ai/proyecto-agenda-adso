import { useState, useEffect } from "react";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState(() => {
    const guardados = localStorage.getItem("contactos");
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);

  function agregarContacto(nuevoContacto) {
    setContactos([...contactos, nuevoContacto]);
  }

  function eliminarContacto(id) {
    setContactos(contactos.filter((c) => c.id !== id));
  }

  return (
    <main className="max-w-2xl mx-auto mt-10 p-4">
      {/* Etiqueta institucional ADSO - Mini reto práctico (página 15) */}
      <div className="flex justify-center mb-3">
        <p className="bg-morado text-white text-xs rounded px-2 py-1 w-fit">
          ADSO
        </p>
      </div>

      <h1 className="text-3xl font-bold text-morado text-center mb-2">
        Agenda ADSO v4
      </h1>
      <p className="text-gray-500 text-center mb-6">
        Interfaz moderna con TailwindCSS
      </p>

      <FormularioContacto onAgregar={agregarContacto} />

      <section>
        {contactos.length === 0 ? (
          <p className="text-center text-gray-400 mt-4">
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