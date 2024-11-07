import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const productVariationSchema = Joi.object({
  size: Joi.string().required().max(50).trim().strict(),
  Price: Joi.number().required().positive(),
  stock: Joi.number().integer().required().min(0),
  ID_discount: Joi.number().optional().allow(null),
});

const createProductSchema = Joi.object({
  ID_SupCategory: Joi.number().required(),
  productName: Joi.string().required().min(3).max(100).trim().strict(),
  description: Joi.string(),
  images: Joi.array().items(Joi.string().uri()).min(1).required(),
  variations: Joi.array().items(productVariationSchema).required(),
});

const updateProductSchema = Joi.object({
  ID_SupCategory: Joi.number().optional(),
  productName: Joi.string().optional().min(3).max(100).trim().strict(),
  description: Joi.string().optional().allow(null).max(500).trim().strict(),
  images: Joi.array().items(Joi.string()).optional(),
  variations: Joi.array().items(productVariationSchema).optional(),
});

const createProduct = async (req, res, next) => {
  try {
    await createProductSchema.validateAsync(req.body, { abortEarly: false });
    console.log("Product data validation:", req.body);
    next();
  } catch (error) {
    console.error("Validation error:", error);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: error.details.map((detail) => detail.message),
    });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    await updateProductSchema.validateAsync(req.body, { abortEarly: false });
    console.log("Product data update validation:", req.body);
    next();
  } catch (error) {
    console.error("Validation error:", error);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: error.details.map((detail) => detail.message),
    });
  }
};

export const ProductValidation = {
  createProduct,
  updateProduct,
};
