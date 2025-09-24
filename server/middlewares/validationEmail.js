// middlewares/validationMiddleware.js
import { body, validationResult } from "express-validator";

export const contactValidationRules = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Debe proporcionar un email válido"),

  body("message")
    .trim()
    .isLength({ min: 10 })
    .withMessage("El mensaje debe tener al menos 10 caracteres")
    .isLength({ max: 1000 })
    .withMessage("El mensaje no puede exceder los 1000 caracteres"),

  body("name")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("El nombre no puede exceder los 100 caracteres")
    .escape(),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    success: false,
    message: "Error de validación",
    errors: extractedErrors,
  });
};
