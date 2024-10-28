import { GET_DB } from '~/config/mysql';

class Category {
    // Lấy tất cả danh mục chưa bị xóa
    static async getAll() {
        const db = GET_DB();
        const [rows] = await db.query(`
            SELECT 
                c.id AS category_id,
                c.categoryName AS category_name,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', s.id,
                        'SupCategoryName', s.SupCategoryName
                    )
                ) AS subcategories
            FROM 
                category c
            LEFT JOIN 
                SupCategory s ON c.id = s.categoryId
            WHERE 
                c.isDelete = 0
            GROUP BY 
                c.id;
        `);
        return rows;
    }

    // Tạo một danh mục mới
    static async create(categoryData) {
        const { categoryName } = categoryData;
        const db = GET_DB();
        const [result] = await db.query(
            'INSERT INTO category (categoryName, isDelete, createdAt, updatedAt) VALUES (?, 0, NOW(), NOW())',
            [categoryName]
        );
        return { id: result.insertId, categoryName };
    }

    // Cập nhật danh mục
    static async update(id, categoryData) {
        const { categoryName } = categoryData;
        const db = GET_DB();
        await db.query(
            'UPDATE category SET categoryName = ?, updatedAt = NOW() WHERE id = ? AND isDelete = 0',
            [categoryName, id]
        );
        return { id, categoryName };
    }

    // Xóa danh mục (đánh dấu là đã xóa)
    static async delete(id) {
        const db = GET_DB();
        const [result] = await db.query(
            'UPDATE category SET isDelete = 1 WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0; // Trả về true nếu có hàng bị ảnh hưởng
    }

    // Tìm danh mục theo ID
    static async findById(id) {
        const db = GET_DB();
        const [rows] = await db.query(
            'SELECT * FROM category WHERE id = ? AND isDelete = 0',
            [id]
        );
        return rows[0] || null; // Trả về danh mục hoặc null nếu không tìm thấy
    }
}

export default Category;
