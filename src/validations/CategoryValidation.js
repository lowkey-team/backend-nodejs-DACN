import Joi from "joi";
import { StatusCodes } from "http-status-codes";

// Định nghĩa schema cho việc tạo danh mục
const createCategorySchema = Joi.object({
  categoryName: Joi.string().required().min(1).max(100).trim().strict()
    .messages({
      "string.base": '"Tên danh mục" phải là một chuỗi',
      "string.empty": '"Tên danh mục" là bắt buộc',
      "string.min": '"Tên danh mục" phải có ít nhất {#limit} ký tự',
      "string.max": '"Tên danh mục" không được quá {#limit} ký tự',
    }),
});

const updateCategorySchema = createCategorySchema.fork(
  ["categoryName"],
  (field) => field.optional()
);

const createCategory = async (req, res, next) => {
  try {
    await createCategorySchema.validateAsync(req.body, { abortEarly: false });
    console.log("Category data validation:", req.body);
    next();
  } catch (error) {
    console.error("Validation error:", error);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: error.details.map((detail) => detail.message),
    });
  }
};

const updateCategory = async (req, res, next) => {
  try {
    await updateCategorySchema.validateAsync(req.body, { abortEarly: false });
    console.log("Category data update validation:", req.body);
    next();
  } catch (error) {
    console.error("Validation error:", error);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: error.details.map((detail) => detail.message),
    });
  }
};

export const CategoryValidation = {
  createCategory,
  updateCategory,
};
