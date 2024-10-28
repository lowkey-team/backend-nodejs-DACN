import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createUserSchema = Joi.object({
    FullName: Joi.string().required().min(3).max(50).trim().strict(),
    Phone: Joi.string().required().min(10).max(15).trim().strict().pattern(/^[0-9]+$/, 'số'),
    Passwords: Joi.string().required().min(6).max(100).trim().strict(),
    address: Joi.string().allow(null).max(255).trim().strict(),
});

const updateUserSchema = createUserSchema.fork(['Passwords'], (field) => field.optional());

const createUser = async (req, res, next) => {
    try {
        await createUserSchema.validateAsync(req.body, { abortEarly: false });
        console.log("User data validation:", req.body);
        next();
    } catch (error) {
        console.error("Validation error:", error);
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            error: error.details.map((detail) => detail.message),
        });
    }
};

const updateUser = async (req, res, next) => {
    try {
        await updateUserSchema.validateAsync(req.body, { abortEarly: false });
        console.log("User data update validation:", req.body);
        next();
    } catch (error) {
        console.error("Validation error:", error);
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            error: error.details.map((detail) => detail.message),
        });
    }
};

export const UserValidation = {
    createUser,
    updateUser,
};
