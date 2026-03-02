import React from "react";

export default function ContactoCard({ contacto, onEliminar }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
      <div>
        <p className="font-bold text-morado-oscuro">{contacto.nombre}</p>
        <p className="text-gray-600">{contacto.telefono}</p>
        <p className="text-gray-600">{contacto.correo}</p>
        {contacto.etiqueta && <p className="text-sm text-gray-400">{contacto.etiqueta}</p>}
      </div>
      <button
        onClick={() => onEliminar(contacto.id)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
      >
        Eliminar
      </button>
    </div>
  );
}