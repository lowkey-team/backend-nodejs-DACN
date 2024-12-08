import { GET_DB } from "~/config/mysql";

class Employee {
  static async createEmployee(fullName, phone, password, address, roleIds) {
    const db = GET_DB();
    let connection;
    try {
      connection = await db.getConnection();
      await connection.beginTransaction();

      const [result] = await connection.query(
        "INSERT INTO employees (FullName, Phone, Passwords, address, isDelete, createdAt, updatedAt) VALUES (?, ?, ?, ?, 0, NOW(), NOW())",
        [fullName, phone, password, address]
      );
      const employeeId = result.insertId;
      console.log("Employee ID:", employeeId);

      const roleValues = roleIds.map((roleId) => [
        employeeId,
        roleId,
        new Date(),
        new Date(),
      ]);
      await connection.query(
        "INSERT INTO employee_roles (employee_id, role_id, createdAt, updatedAt) VALUES ?",
        [roleValues]
      );

      await connection.commit();

      return {
        employeeId,
        message: "Employee created and roles assigned successfully",
      };
    } catch (error) {
      if (connection) await connection.rollback();
      console.error("Error during transaction:", error);
      throw error;
    } finally {
      if (connection) await connection.release();
    }
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
