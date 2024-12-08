import { GET_DB } from "~/config/mysql";

class Employee {
  static async createEmployee(fullName, phone, password, address) {
    const db = GET_DB();
    const [result] = await db.query(
      "INSERT INTO employees (FullName, Phone, Passwords, address, isDelete, createdAt, updatedAt) VALUES (?, ?, ?, ?, 0, NOW(), NOW())",
      [fullName, phone, password, address]
    );
    return result.insertId;
  }

  static async getAllEmployees() {
    const db = GET_DB();
    const [rows] = await db.query("SELECT * FROM employees WHERE isDelete = 0");
    return rows;
  }

  static async getEmployeeById(id) {
    const db = GET_DB();
    const [rows] = await db.query(
      "SELECT * FROM employees WHERE id = ? AND isDelete = 0",
      [id]
    );
    return rows[0];
  }

  static async updateEmployee(id, fullName, phone, address) {
    const db = GET_DB();
    const [result] = await db.query(
      "UPDATE employees SET FullName = ?, Phone = ?, address = ?, updatedAt = NOW() WHERE id = ? AND isDelete = 0",
      [fullName, phone, address, id]
    );
    return result.affectedRows;
  }

  static async deleteEmployee(id) {
    const db = GET_DB();
    const [result] = await db.query(
      "UPDATE employees SET isDelete = 1, updatedAt = NOW() WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  }
}

export default Employee;
