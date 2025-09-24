// utils/emailService.js
import resend from "../config/resendConfig.js";

export default class EmailService {
  static async sendContactEmail({ name, email, message }) {
    try {
      const { data, error } = await resend.emails.send({
        from: "Don Grillado <onboarding@resend.dev>",
        to: [process.env.ADMIN_EMAIL],
        subject: `Nueva consulta de ${name || "Cliente"}`,
        html: this.generateContactHTML({ name, email, message }),
        text: this.generateContactText({ name, email, message }),
      });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true, data };
    } catch (error) {
      console.error("Error en EmailService:", error);
      throw new Error("Error al enviar el email");
    }
  }

  static generateContactHTML({ name, email, message }) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Nueva consulta desde tu sitio web</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
          <p><strong>Nombre:</strong> ${name || "No proporcionado"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Fecha:</strong> ${new Date().toLocaleString("es-ES")}</p>
        </div>
        <div style="margin-top: 20px;">
          <strong>Mensaje:</strong>
          <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #007bff;">
            ${message.replace(/\n/g, "<br>")}
          </p>
        </div>
      </div>
    `;
  }

  static generateContactText({ name, email, message }) {
    return `
Nueva consulta desde tu sitio web

Nombre: ${name || "No proporcionado"}
Email: ${email}
Fecha: ${new Date().toLocaleString("es-ES")}

Mensaje:
${message}
    `.trim();
  }
}
