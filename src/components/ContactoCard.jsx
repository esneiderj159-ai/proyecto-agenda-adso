export default function ContactoCard({ contacto, onEliminar }) {
  const { id, nombre, telefono, correo, etiqueta } = contacto;

  return (
    <article className="bg-white border rounded-lg shadow-sm p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-morado-oscuro">{nombre}</h3>

          {etiqueta && (
            <span className="inline-block bg-morado text-white text-xs rounded px-2 py-1 mt-1 mb-2">
              {etiqueta}
            </span>
          )}

          <p className="text-sm text-gray-600">
             <span className="ml-1">{telefono}</span>
          </p>
          <p className="text-sm text-gray-600">
            ✉️ <span className="ml-1">{correo}</span>
          </p>
        </div>

        <button
          onClick={() => onEliminar(id)}
          className="text-red-400 hover:text-red-600 text-sm font-medium transition-colors duration-200"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}