function ContactoCard({ nombre, telefono, correo, etiqueta, onEliminar }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{nombre}</h2>
        {telefono && (
          <p className="text-sm text-gray-600">Teléfono: {telefono}</p>
        )}
        {correo && (
          <p className="text-sm text-gray-600">Correo: {correo}</p>
        )}
        {etiqueta && (
          <span className="inline-block mt-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
            {etiqueta}
          </span>
        )}
      </div>
      <button
        onClick={onEliminar}
        className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
      >
        Eliminar
      </button>
    </div>
  );
}

export default ContactoCard;
