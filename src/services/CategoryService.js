import Category from '~/models/CategoryModel';

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
        const category = await Category.findById(id);
        if (!category) {
            throw new Error('Danh mục không tồn tại');
        }
        return await Category.update(id, categoryData);
    }

    // Xóa danh mục
    static async deleteCategory(id) {
        const category = await Category.findById(id);
        if (!category) {
            throw new Error('Danh mục không tồn tại');
        }
        return await Category.delete(id);
    }

    // Tìm danh mục theo ID
    static async findCategoryById(id) {
        const category = await Category.findById(id);
        if (!category) {
            throw new Error('Danh mục không tồn tại');
        }
        return category;
    }
}

export default CategoryService;
