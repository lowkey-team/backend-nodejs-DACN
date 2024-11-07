import { body, validationResult } from "express-validator";

class ProductVariationValidation {
  static createVariation = [
    body("ID_Product").isInt().withMessage("ID_Product must be an integer"),
    body("size").notEmpty().withMessage("Size is required"),
    body("Price").isDecimal().withMessage("Price must be a valid decimal"),
    body("stock").isInt().withMessage("Stock must be an integer"),
    body("ID_discount")
      .optional()
      .isInt()
      .withMessage("ID_discount must be an integer if provided"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

  static updateVariation = [
    body("size")
      .optional()
      .notEmpty()
      .withMessage("Size must not be empty if provided"),
    body("Price")
      .optional()
      .isDecimal()
      .withMessage("Price must be a valid decimal if provided"),
    body("stock")
      .optional()
      .isInt()
      .withMessage("Stock must be an integer if provided"),
    body("ID_discount")
      .optional()
      .isInt()
      .withMessage("ID_discount must be an integer if provided"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
}

export { ProductVariationValidation };
