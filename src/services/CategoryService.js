import Category from "~/models/CategoryModel";

class CategoryService {
  // Lấy tất cả danh mục
  static async getAllCategories() {
    return await Category.getAll();
  }

  // Tạo danh mục mới
  static async createCategory(categoryData) {
    return await Category.create(categoryData);
  }

  // Cập nhật danh mục
  static async updateCategory(id, categoryData) {
    // const category = await Category.findById(id);
    // if (!category) {
    //   throw new Error("Danh mục không tồn tại");
    // }
    return await Category.update(id, categoryData);
  }

  // Xóa danh mục
  static async deleteCategory(id) {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error("Danh mục không tồn tại");
    }
    return await Category.delete(id);
  }

  // Tìm danh mục theo ID
  static async findCategoryById(id) {
    const category = await Category.findById(id);
    if (!category) {
      throw new Error("Danh mục không tồn tại");
    }
    return category;
  }

  // Tạo danh mục con (subCategory)
  static async createSubCategory(subCategoryData) {
    const { categoryId, SupCategoryName } = subCategoryData;

    return await Category.createSubCategory(subCategoryData);
  }

  // Cập nhật danh mục con
  static async updateSubCategory(id, subCategoryData) {
    // const subCategory = await Category.findSubCategoryById(id);
    // if (!subCategory) {
    //   throw new Error("Danh mục con không tồn tại");
    // }
    return await Category.updateSubcategory(id, subCategoryData);
  }

  // Xóa danh mục con
  static async deleteSubCategory(id) {
    // const subCategory = await Category.findSubCategoryById(id);
    // if (!subCategory) {
    //   throw new Error("Danh mục con không tồn tại");
    // }
    return await Category.deleteSubcategory(id);
  }

  // Tìm danh mục con theo ID
  static async findSubCategoryById(id) {
    const subCategory = await Category.findSubCategoryById(id);
    if (!subCategory) {
      throw new Error("Danh mục con không tồn tại");
    }
    return subCategory;
  }

  // Lấy tất cả danh mục con theo categoryId
  static async getSubCategoriesByCategoryId(categoryId) {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error("Danh mục cha không tồn tại");
    }
    return await Category.getSubCategoriesByCategoryId(categoryId);
  }
}

export default CategoryService;
