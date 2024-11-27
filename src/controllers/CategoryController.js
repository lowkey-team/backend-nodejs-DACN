import CategoryService from "~/services/CategoryService";

class CategoryController {
  // Lấy tất cả danh mục
  static async getAllCategories(req, res) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Tạo danh mục mới
  static async createCategory(req, res) {
    try {
      const newCategory = await CategoryService.createCategory(req.body);
      res.status(201).json(newCategory);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Cập nhật danh mục
  static async updateCategory(req, res) {
    const { id } = req.params;
    try {
      const updatedCategory = await CategoryService.updateCategory(
        id,
        req.body
      );
      res.status(200).json(updatedCategory);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Xóa danh mục
  static async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      const result = await CategoryService.deleteCategory(id);
      if (result) {
        res.status(200).json({ message: "Danh mục đã bị xóa" });
      } else {
        res.status(404).json({ message: "Danh mục không tồn tại" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Tìm danh mục theo ID
  static async findCategoryById(req, res) {
    const { id } = req.params;
    try {
      const category = await CategoryService.findCategoryById(id);
      res.status(200).json(category);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Tạo danh mục con
  static async createSubCategory(req, res) {
    try {
      const newSubCategory = await CategoryService.createSubCategory(req.body);
      res.status(201).json(newSubCategory);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Cập nhật danh mục con
  static async updateSubCategory(req, res) {
    const { id } = req.params;
    try {
      const updatedSubCategory = await CategoryService.updateSubCategory(
        id,
        req.body
      );
      res.status(200).json(updatedSubCategory);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Xóa danh mục con
  static async deleteSubCategory(req, res) {
    const { id } = req.params;
    try {
      const result = await CategoryService.deleteSubCategory(id);
      if (result) {
        res.status(200).json({ message: "Danh mục con đã bị xóa" });
      } else {
        res.status(404).json({ message: "Danh mục con không tồn tại" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Tìm danh mục con theo ID
  static async findSubCategoryById(req, res) {
    const { id } = req.params;
    try {
      const subCategory = await CategoryService.findSubCategoryById(id);
      res.status(200).json(subCategory);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Lấy tất cả danh mục con theo categoryId
  static async getSubCategoriesByCategoryId(req, res) {
    const { categoryId } = req.params;
    try {
      const subCategories = await CategoryService.getSubCategoriesByCategoryId(
        categoryId
      );
      res.status(200).json(subCategories);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default CategoryController;
