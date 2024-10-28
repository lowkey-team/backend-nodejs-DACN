import { GET_DB } from "~/config/mysql";

class User {
    // Lấy tất cả người dùng
    static async getAll() {
        const db = GET_DB();
        const [rows] = await db.query('SELECT * FROM Users WHERE isDelete = 0'); 
        return rows;
    }

    // Tạo người dùng mới
    static async create(userData) {
        const { FullName, Phone, Passwords, address } = userData;
        const db = GET_DB();
        const [result] = await db.query('INSERT INTO Users (FullName, Phone, Passwords, address, isDelete, createdAt, updatedAt) VALUES (?, ?, ?, ?, 0, NOW(), NOW())', [FullName, Phone, Passwords, address]);
        return { id: result.insertId, ...userData };
    }

    // Cập nhật người dùng
    static async update(id, userData) {
        const { FullName, Phone, address } = userData;
        const db = GET_DB();
        await db.query('UPDATE Users SET FullName = ?, Phone = ?, address = ?, updatedAt = NOW() WHERE id = ? AND isDelete = 0', [FullName, Phone, address, id]);
        return { id, ...userData };
    }

    // Xóa người dùng (đánh dấu là đã xóa)
    static async delete(id) {
        const db = GET_DB();
        const [result] = await db.query('UPDATE Users SET isDelete = 1 WHERE id = ?', [id]);
        return result.affectedRows > 0; 
    }

    // Tìm người dùng theo ID
    static async findById(id) {
        const db = GET_DB();
        const [rows] = await db.query('SELECT * FROM Users WHERE id = ? AND isDelete = 0', [id]);
        return rows[0] || null; 
    }
}

export default User;
