import React, { useState } from "react";

const estadoInicial = { nombre: "", telefono: "", correo: "", etiqueta: "" };

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState(estadoInicial);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();

    if (!form.nombre.trim() || !form.telefono.trim() || !form.correo.trim()) {
      alert("Por favor completa los campos obligatorios (*)");
      return;
    }

    onAgregar(form);
    setForm(estadoInicial);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-md rounded-lg p-5 md:p-8 flex flex-col gap-4 mb-6 max-w-2xl mx-auto"
    >
      <h2 className="text-xl md:text-2xl font-bold text-morado-oscuro">
        Nuevo contacto
      </h2>

      <label htmlFor="nombre" className="text-sm font-semibold">
        Nombre *
      </label>
      <input
        id="nombre"
        name="nombre"
        value={form.nombre}
        onChange={onChange}
        placeholder="Ej: Ana López"
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-morado"
        required
      />

      <label htmlFor="telefono" className="text-sm font-semibold">
        Teléfono *
      </label>
      <input
        id="telefono"
        name="telefono"
        value={form.telefono}
        onChange={onChange}
        placeholder="Ej: 3001234567"
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-morado"
        required
      />

      <label htmlFor="correo" className="text-sm font-semibold">
        Correo *
      </label>
      <input
        id="correo"
        name="correo"
        value={form.correo}
        onChange={onChange}
        placeholder="Ej: ana@correo.com"
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-morado"
        required
      />

      <label htmlFor="etiqueta" className="text-sm font-semibold">
        Etiqueta (opcional)
      </label>
      <input
        id="etiqueta"
        name="etiqueta"
        value={form.etiqueta}
        onChange={onChange}
        placeholder="Ej: amigo, trabajo, familia"
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-morado"
      />

      <button
        type="submit"
        className="bg-morado hover:bg-morado-oscuro text-white py-2 rounded-md transition-colors duration-200"
      >
        Agregar contacto
      </button>
    </form>
  );
}