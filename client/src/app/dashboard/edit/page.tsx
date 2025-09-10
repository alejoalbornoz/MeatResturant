import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

function Page() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="container p-4 mx-auto mt-10">
            <h1 className="flex justify-center items-center text-3xl font-bold text-white mb-8">
              Editar Reservas
            </h1>

            <div className="bg-zinc-800 w-full max-w-3xl mx-auto p-8 rounded-3xl shadow-lg">
              <form className="space-y-6">
                {/* Nombre */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Ingrese el nombre"
                  />
                </div>

                {/* Apellido */}
                <div>
                  <label
                    htmlFor="surname"
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Ingrese el apellido"
                  />
                </div>

                {/* Celular */}
                <div>
                  <label
                    htmlFor="telephone"
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    Celular
                  </label>
                  <input
                    type="text"
                    id="telephone"
                    name="telephone"
                    className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Ingrese el número de celular"
                  />
                </div>

                {/* Fecha y Hora */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-200 mb-2"
                    >
                      Fecha
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-gray-200 mb-2"
                    >
                      Hora
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                {/* Mesa y Personas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="table"
                      className="block text-sm font-medium text-gray-200 mb-2"
                    >
                      Mesa
                    </label>
                    <input
                      type="number"
                      id="table"
                      name="table"
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="people"
                      className="block text-sm font-medium text-gray-200 mb-2"
                    >
                      Personas
                    </label>
                    <input
                      type="number"
                      id="people"
                      name="people"
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-700 p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                {/* Código */}
                <div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-200 mb-2"
                  >
                    Código
                  </label>
                  <input
                    type="text"
                    readOnly
                    className="w-full rounded-xl bg-zinc-700 border border-zinc-600 p-3 text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    value="ABC123"
                  />
                </div>

                {/* Botón */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-medium transition"
                  >
                    Guardar cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export default Page;
