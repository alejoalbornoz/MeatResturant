"use client";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070608] text-white px-6 py-12">
      {/* Título */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-orange-600">Contacto</h1>
        <p className="text-gray-300 mt-2">
          Estamos para atenderte. Podés escribirnos o visitarnos en nuestro
          local.
        </p>
      </div>

      {/* Contenido dividido en dos columnas */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Información de contacto */}
        <div className="bg-[#111010] p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-orange-500 mb-6">
            Nuestros datos
          </h2>
          <ul className="space-y-4 text-gray-300 mb-10">
            <li>📞 Teléfono: +54 11 4567 8910</li>
            <li>⏰ Horarios: Lunes a Domingo - 12:00 a 23:00 hs</li>
            <li>📍 Dirección: Av. Siempre Viva 123, Buenos Aires, Argentina</li>
          </ul>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.0182829561472!2d-58.38647311056184!3d-34.60369918775099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4aa9f0a6da5edb%3A0x11bead4e234e558b!2sObelisco!5e0!3m2!1ses-419!2sar!4v1755699513777!5m2!1ses-419!2sar"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl"
          ></iframe>
        </div>

        {/* Formulario */}
        <div className="bg-[#111010] p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-orange-500 mb-6">
            Escribinos
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Tu nombre"
              className="w-full p-3 rounded-lg bg-[#1a1919] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              placeholder="Tu email"
              className="w-full p-3 rounded-lg bg-[#1a1919] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              placeholder="Tu mensaje"
              rows="5"
              className="w-full p-3 rounded-lg bg-[#1a1919] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            ></textarea>
            <button
              type="submit"
              className="w-full  cursor-pointer  bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
