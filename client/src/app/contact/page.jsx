"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "¡Mensaje enviado correctamente! Te responderemos pronto.",
        });
        // Limpiar formulario
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message:
            data.message || "Error al enviar el mensaje. Intenta nuevamente.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message:
          "Error de conexión. Verifica que el servidor esté funcionando.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070608] text-white px-6 py-12">
      {/* Título */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-red-600">Contacto</h1>
        <p className="text-gray-300 mt-2">
          Estamos para atenderte. Podés escribirnos o visitarnos en nuestro
          local.
        </p>
      </div>

      {/* Contenido dividido en dos columnas */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Información de contacto */}
        <div className="bg-[#111010] p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-red-500 mb-6">
            Nuestros datos
          </h2>
          <ul className="space-y-4 text-gray-300 mb-10">
            <li className="flex items-center gap-3">
              <span>📞</span>
              <span>Teléfono: +54 11 4567 8910</span>
            </li>
            <li className="flex items-center gap-3">
              <span>⏰</span>
              <span>Horarios: Lunes a Domingo - 12:00 a 23:00 hs</span>
            </li>
            <li className="flex items-center gap-3">
              <span>📍</span>
              <span>Dirección: Av. 123, Buenos Aires, Argentina</span>
            </li>
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
          <h2 className="text-2xl font-semibold text-red-500 mb-6">
            Escribinos
          </h2>

          {/* Mensaje de estado */}
          {status.message && (
            <div
              className={`p-4 rounded-lg mb-6 ${
                status.type === "success"
                  ? "bg-green-900/50 border border-green-600 text-green-300"
                  : "bg-red-900/50 border border-red-600 text-red-300"
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Tu nombre (opcional)"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-[#1a1919] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Tu email *"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-[#1a1919] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Tu mensaje *"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-[#1a1919] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Enviando...
                </span>
              ) : (
                "Enviar mensaje"
              )}
            </button>
          </form>

          {/* Información adicional del formulario */}
          <div className="mt-6 p-4 bg-[#1a1919] rounded-lg">
            <p className="text-sm text-gray-400">
              📧 Te responderemos a la brevedad. Generalmente respondemos dentro
              de las 24 horas.
            </p>
          </div>
        </div>
      </div>

      {/* Información adicional al final */}
      <div className="mt-12 text-center text-gray-400">
        <p>¿Prefieres contactarnos directamente?</p>
        <p className="mt-2">
          Llamanos al <span className="text-red-500">+54 11 0000000</span> o
          visitanos en nuestro local.
        </p>
      </div>
    </div>
  );
}
