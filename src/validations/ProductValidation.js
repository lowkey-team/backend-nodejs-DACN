import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createProductSchema = Joi.object({
    ID_SupCategory: Joi.number().required(),
    productName: Joi.string().required().min(3).max(100).trim().strict(),
    description: Joi.string().allow(null).max(500).trim().strict(),
});

const updateProductSchema = createProductSchema.fork(['ID_SupCategory'], (field) => field.optional());

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
            error: error.details.map((detail) => detail.message),
        });
    }
};

export const ProductValidation = {
    createProduct,
    updateProduct,
};
