import React from "react";

export default function DashboardAdmin() {
  return (
    <div className="h-screen bg-[#070608] text-white flex mt-20">
      {/* Panel de control lateral */}
      <aside className="w-64 bg-neutral-800 p-4 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-6">Panel</h2>
        <nav className="flex flex-col gap-3">
          <a href="#" className="hover:bg-neutral-700 p-2 rounded">
            Usuarios
          </a>
          <a href="#" className="hover:bg-neutral-700 p-2 rounded">
            Reservas
          </a>
          <a href="#" className="hover:bg-neutral-700 p-2 rounded">
            Estadísticas
          </a>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Lista de Usuarios</h1>

        {/* Tabla de usuarios */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-neutral-900 border border-neutral-700 rounded-lg">
            <thead>
              <tr className="bg-neutral-800 text-left">
                <th className="py-3 px-4 border-b border-neutral-700">
                  Código
                </th>
                <th className="py-3 px-4 border-b border-neutral-700">
                  Nombre y Apellido
                </th>

                <th className="py-3 px-4 border-b border-neutral-700">
                  Telefono
                </th>
                <th className="py-3 px-4 border-b border-neutral-700">
                  Fecha y Horario
                </th>
                <th className="py-3 px-4 border-b border-neutral-700">
                  Mesa Reservada
                </th>
                <th className="py-3 px-4 border-b border-neutral-700">
                  Cantidad de Personas
                </th>

                <th className="py-3 px-4 border-b border-neutral-700">
                  Estado de Reserva
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Ejemplo de fila */}
              <tr className="hover:bg-neutral-700 ">
                <td className="py-2 px-4 border-b border-neutral-700">
                  GFA831BD
                </td>
                <td className="py-2 px-4 border-b border-neutral-700">
                  Juan Pérez
                </td>
                <td className="py-2 px-4 border-b border-neutral-700">
                  1131414
                </td>
                <td className="py-2 px-4 border-b border-neutral-700">
                  25/06/2025 11:00hs
                </td>
                <td className="py-2 px-4 border-b border-neutral-700">5</td>
                <td className="py-2 px-4 border-b border-neutral-700">3</td>
                <td className="py-2 px-4 border-b border-neutral-700">
                  Activo
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
