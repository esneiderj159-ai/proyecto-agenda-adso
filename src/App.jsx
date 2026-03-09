// Importamos useEffect y useState para manejar estados y efectos en el componente principal
import { useEffect, useState } from "react";

// Importamos los servicios que se comunican con JSON Server
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api";

// Importamos la configuración global de la app desde config.js
// Así si cambia la ficha, el título o el subtítulo, solo se edita config.js
import { APP_INFO } from "./config";

// Importamos los componentes hijos
import FormularioContacto from "./components/FormularioContacto.jsx";
import ContactoCard from "./components/ContactoCard.jsx";

// Componente principal de la aplicación
function App() {
  // Estado que almacena la lista de contactos obtenidos de la API
  const [contactos, setContactos] = useState([]);

  // Estado que indica si estamos cargando información (por ejemplo, al inicio)
  const [cargando, setCargando] = useState(true);

  // Estado para guardar mensajes de error generales de la aplicación
  const [error, setError] = useState("");

  // useEffect que se ejecuta una sola vez al montar el componente
  // Aquí cargamos los contactos iniciales desde JSON Server
  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true); // Indicamos que estamos cargando
        setError("");      // Limpiamos posibles errores anteriores
        const data = await listarContactos(); // Llamamos a la API
        setContactos(data); // Guardamos la lista en el estado
      } catch (error) {
        console.error("Error al cargar contactos:", error);
        // Mensaje amigable al usuario (sin tecnicismos)
        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo."
        );
      } finally {
        setCargando(false); // Finalizamos el estado de carga
      }
    };
    cargarContactos();
  }, []);

  // Función para agregar un nuevo contacto usando la API (async para trabajar con enviando del formulario)
  const onAgregarContacto = async (nuevoContacto) => {
    try {
      setError(""); // Limpiamos cualquier error viejo antes de intentar guardar
      const creado = await crearContacto(nuevoContacto);
      // Actualizamos el estado agregando el contacto recién creado a la lista
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      console.error("Error al crear contacto:", error);
      // Mensaje claro y útil si falla la creación
      setError(
        "No se pudo guardar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente."
      );
      // Relanzamos el error para que el formulario pueda reaccionar (apagar el estado enviando)
      throw error;
    }
  };

  // Función para eliminar un contacto por su id
  const onEliminarContacto = async (id) => {
    try {
      setError(""); // Limpiamos errores previos
      await eliminarContactoPorId(id);
      // Filtramos el contacto eliminado de la lista local
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
      // Si algo falla al eliminar, informamos al usuario con un mensaje amigable
      setError(
        "No se pudo eliminar el contacto. Vuelve a intentarlo o verifica el servidor."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contenedor principal centrado */}
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Encabezado principal — usa APP_INFO desde config.js para fácil mantenimiento */}
        <header className="mb-8">
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
            Desarrollo Web ReactJS Ficha {APP_INFO.ficha}
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
            {APP_INFO.titulo}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {APP_INFO.subtitulo}
          </p>
        </header>

        {/* Si hay un error global, lo mostramos en un recuadro rojo */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {/* Si estamos cargando, mostramos un mensaje de espera */}
        {cargando ? (
          <p className="text-sm text-gray-500">Cargando contactos...</p>
        ) : (
          <>
            {/* Formulario para crear nuevos contactos */}
            <FormularioContacto onAgregar={onAgregarContacto} />

            {/* Listado de contactos */}
            <section className="space-y-4">
              {contactos.length === 0 ? (
                // Mensaje cuando no existen contactos aún
                <p className="text-sm text-gray-500">
                  Aún no tienes contactos registrados. Agrega el primero usando
                  el formulario superior.
                </p>
              ) : (
                // Recorremos la lista y mostramos una tarjeta por cada contacto
                contactos.map((c) => (
                  <ContactoCard
                    key={c.id}
                    nombre={c.nombre}
                    telefono={c.telefono}
                    correo={c.correo}
                    etiqueta={c.etiqueta}
                    onEliminar={() => onEliminarContacto(c.id)}
                  />
                ))
              )}
            </section>
          </>
        )}

        {/* Pie de página con los datos del instructor */}
        <footer className="mt-8 text-xs text-gray-400">
          <p>Desarrollo Web — ReactJS | Proyecto Agenda ADSO</p>
          <p>Instructor: Gustavo Adolfo Bolaños Dorado</p>
        </footer>

      </div>
    </div>
  );
}

// Exportamos el componente principal
export default App;