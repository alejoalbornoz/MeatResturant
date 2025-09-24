// controllers/contactController.js
import EmailService from "../services/emailServices.js";

class ContactController {
  static async sendContact(req, res) {
    try {
      const { name, email, message } = req.body;

      // Validación básica adicional
      if (!email || !message) {
        return res.status(400).json({
          success: false,
          message: "Email y mensaje son requeridos",
        });
      }

      // Enviar email
      const result = await EmailService.sendContactEmail({
        name,
        email,
        message,
      });

      res.status(200).json({
        success: true,
        message: "Mensaje enviado correctamente",
        data: result,
      });
    } catch (error) {
      console.error("Error en ContactController:", error);

      res.status(500).json({
        success: false,
        message: "Error interno del servidor al enviar el mensaje",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  static async healthCheck(req, res) {
    res.status(200).json({
      success: true,
      message: "Contact service is running",
      timestamp: new Date().toISOString(),
    });
  }
}

export default ContactController;
