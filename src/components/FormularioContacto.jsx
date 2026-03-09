import { useState } from "react";

function FormularioContacto({ onAgregar }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [etiqueta, setEtiqueta] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      await onAgregar({ nombre, telefono, correo, etiqueta });
      setNombre("");
      setTelefono("");
      setCorreo("");
      setEtiqueta("");
    } catch (error) {
      console.error("Error al enviar contacto:", error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-white shadow rounded-lg p-4 space-y-3"
    >
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-sm"
        required
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-sm"
      />
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-sm"
      />
      <input
        type="text"
        placeholder="Etiqueta (ej: trabajo, familia)"
        value={etiqueta}
        onChange={(e) => setEtiqueta(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg text-sm"
      />
      <button
        type="submit"
        disabled={enviando}
        className="w-full bg-purple-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-600 disabled:opacity-50"
      >
        {enviando ? "Guardando..." : "Agregar contacto"}
      </button>
    </form>
  );
}

export default FormularioContacto;
