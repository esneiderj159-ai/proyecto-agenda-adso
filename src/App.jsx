<<<<<<< HEAD
import { useEffect, useState } from "react";
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api";
import { APP_INFO } from "./config";
import FormularioContacto from "./components/FormularioContacto.jsx";
import ContactoCard from "./components/ContactoCard.jsx";

function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);

=======
// Importamos hooks de React
import { useEffect, useState } from "react";

// Importamos las funciones de la API (capa de datos)
import {
  listarContactos,
  crearContacto,
  actualizarContacto,
  eliminarContactoPorId,
} from "./api";

// Importamos la configuración global de la aplicación
import { APP_INFO } from "./config";

// Importamos componentes hijos
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

function App() {
  // Estado que almacena la lista de contactos obtenidos de la API
  const [contactos, setContactos] = useState([]);

  // Estado que indica si estamos cargando información
  const [cargando, setCargando] = useState(true);

  // Estado para guardar mensajes de error
  const [error, setError] = useState("");

  // Estado para el término de búsqueda
  const [busqueda, setBusqueda] = useState("");

  // Estado para el orden de contactos
  const [ordenAsc, setOrdenAsc] = useState(true);

  // Estado para saber qué contacto estamos editando
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

  // Cargar contactos al iniciar
>>>>>>> 6e8b401 (clase 11_V9_ADSO)
  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true);
        setError("");
<<<<<<< HEAD
        const data = await listarContactos();
        setContactos(data);
=======

        const data = await listarContactos();
        setContactos(data);

>>>>>>> 6e8b401 (clase 11_V9_ADSO)
      } catch (error) {
        console.error("Error al cargar contactos:", error);
        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo."
        );
      } finally {
        setCargando(false);
      }
    };
<<<<<<< HEAD
    cargarContactos();
  }, []);

  const onAgregarContacto = async (nuevoContacto) => {
    try {
      setError("");
      const creado = await crearContacto(nuevoContacto);
      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      console.error("Error al crear contacto:", error);
      setError(
        "No se pudo guardar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente."
      );
=======

    cargarContactos();
  }, []);

  // Agregar contacto con delay visual
const onAgregarContacto = async (nuevoContacto) => {
  try {
    setError("");

    const creado = await crearContacto(nuevoContacto);

    // Pequeño delay para que se vea el guardando
    await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms

    setContactos((prev) => [...prev, creado]);

  } catch (error) {
    console.error("Error al crear contacto:", error);

    setError(
      "No se pudo guardar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente."
    );

    throw error;
  }
};

  // Actualizar contacto
  const onActualizarContacto = async (contactoActualizado) => {
    try {
      setError("");

      const actualizado = await actualizarContacto(
        contactoActualizado.id,
        contactoActualizado
      );

      setContactos((prev) =>
        prev.map((c) => (c.id === actualizado.id ? actualizado : c))
      );

      setContactoEnEdicion(null);

    } catch (error) {
      console.error("Error al actualizar contacto:", error);

      setError(
        "No se pudo actualizar el contacto. Verifica tu conexión o el servidor e intenta nuevamente."
      );

>>>>>>> 6e8b401 (clase 11_V9_ADSO)
      throw error;
    }
  };

<<<<<<< HEAD
  const onEliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
=======
  // Eliminar contacto
  const onEliminarContacto = async (id) => {
    try {
      setError("");

      await eliminarContactoPorId(id);

      setContactos((prev) => prev.filter((c) => c.id !== id));

      setContactoEnEdicion((actual) =>
        actual && actual.id === id ? null : actual
      );

    } catch (error) {
      console.error("Error al eliminar contacto:", error);

>>>>>>> 6e8b401 (clase 11_V9_ADSO)
      setError(
        "No se pudo eliminar el contacto. Vuelve a intentarlo o verifica el servidor."
      );
    }
  };

<<<<<<< HEAD
=======
  // Activar modo edición
  const onEditarClick = (contacto) => {
    setContactoEnEdicion(contacto);
    setError("");
  };

  // Cancelar edición
  const onCancelarEdicion = () => {
    setContactoEnEdicion(null);
  };

  // FILTRAR contactos
>>>>>>> 6e8b401 (clase 11_V9_ADSO)
  const contactosFiltrados = contactos.filter((c) => {
    const termino = busqueda.toLowerCase();
    const nombre = c.nombre.toLowerCase();
    const correo = c.correo.toLowerCase();
    const etiqueta = (c.etiqueta || "").toLowerCase();

    return (
      nombre.includes(termino) ||
      correo.includes(termino) ||
      etiqueta.includes(termino)
    );
  });

<<<<<<< HEAD
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();
    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;
=======
  // ORDENAR contactos
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = a.nombre.toLowerCase();
    const nombreB = b.nombre.toLowerCase();

    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;

>>>>>>> 6e8b401 (clase 11_V9_ADSO)
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
<<<<<<< HEAD
=======

>>>>>>> 6e8b401 (clase 11_V9_ADSO)
        <header className="mb-8">
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
            Desarrollo Web ReactJS Ficha {APP_INFO.ficha}
          </p>
<<<<<<< HEAD
          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
            {APP_INFO.titulo}
          </h1>
=======

          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
            {APP_INFO.titulo}
          </h1>

>>>>>>> 6e8b401 (clase 11_V9_ADSO)
          <p className="text-sm text-gray-600 mt-1">
            {APP_INFO.subtitulo}
          </p>
        </header>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {cargando ? (
          <p className="text-sm text-gray-500">Cargando contactos...</p>
        ) : (
          <>
<<<<<<< HEAD
            <FormularioContacto onAgregar={onAgregarContacto} />

            <div className="my-4 flex items-center gap-2">
              <input
                type="text"
                placeholder="Buscar contacto por nombre, correo o etiqueta..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
              />
              <button
                onClick={() => setOrdenAsc(!ordenAsc)}
                className="px-3 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600"
              >
                {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
              </button>
            </div>

            <section className="space-y-4">
=======
            <FormularioContacto
              onAgregar={onAgregarContacto}
              onActualizar={onActualizarContacto}
              contactoEnEdicion={contactoEnEdicion}
              onCancelarEdicion={onCancelarEdicion}
            />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">

              <input
                type="text"
                className="w-full md:flex-1 rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm"
                placeholder="Buscar por nombre, correo o etiqueta..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setOrdenAsc((prev) => !prev)}
                className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200"
              >
                {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
              </button>

            </div>

            <section className="space-y-4">

>>>>>>> 6e8b401 (clase 11_V9_ADSO)
              {contactosOrdenados.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No se encontraron contactos que coincidan con la búsqueda.
                </p>
              ) : (
                contactosOrdenados.map((c) => (
                  <ContactoCard
                    key={c.id}
                    nombre={c.nombre}
                    telefono={c.telefono}
                    correo={c.correo}
                    etiqueta={c.etiqueta}
                    onEliminar={() => onEliminarContacto(c.id)}
<<<<<<< HEAD
                  />
                ))
              )}
=======
                    onEditar={() => onEditarClick(c)}
                  />
                ))
              )}

>>>>>>> 6e8b401 (clase 11_V9_ADSO)
            </section>
          </>
        )}

        <footer className="mt-8 text-xs text-gray-400">
<<<<<<< HEAD
          <p>Desarrollo Web — ReactJS | Proyecto Agenda ADSO</p>
          <p>Instructor: Gustavo Adolfo Bolaños Dorado</p>
        </footer>
=======
          <p>Desarrollo Web – ReactJS | Proyecto Agenda ADSO</p>
          <p>Instructor: Gustavo Adolfo Bolaños Dorado</p>
        </footer>

>>>>>>> 6e8b401 (clase 11_V9_ADSO)
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 6e8b401 (clase 11_V9_ADSO)
