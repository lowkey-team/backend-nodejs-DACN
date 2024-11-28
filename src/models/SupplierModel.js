import { GET_DB } from "~/config/mysql";

class Supplier {
  // Get all suppliers
  static async getAll() {
    const db = GET_DB();
    try {
      const [rows] = await db.query(
        "SELECT * FROM supplier WHERE isDelete = 0"
      );
      return rows;
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      throw error;
    }
  }

  // Get supplier by id
  static async findById(id) {
    const db = GET_DB();
    try {
      const [rows] = await db.query(
        "SELECT * FROM supplier WHERE id = ? AND isDelete = 0",
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      console.error("Error fetching supplier by ID:", error);
      throw error;
    }
  }

  // Create a new supplier
  static async create(supplierData) {
    const { SupplierName, address, phoneNumber, Email, contactPerson } =
      supplierData;
    const db = GET_DB();
    try {
      const [result] = await db.query(
        "INSERT INTO supplier (SupplierName, address, phoneNumber, Email, contactPerson, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())",
        [SupplierName, address, phoneNumber, Email, contactPerson]
      );
      return { id: result.insertId, SupplierName };
    } catch (error) {
      console.error("Error creating supplier:", error);
      throw error;
    }
  }

  // Update an existing supplier
  static async update(id, supplierData) {
    const { SupplierName, address, phoneNumber, Email, contactPerson } =
      supplierData;
    const db = GET_DB();
    try {
      await db.query(
        "UPDATE supplier SET SupplierName = ?, address = ?, phoneNumber = ?, Email = ?, contactPerson = ?, updatedAt = NOW() WHERE id = ? AND isDelete = 0",
        [SupplierName, address, phoneNumber, Email, contactPerson, id]
      );
      return { id, SupplierName };
    } catch (error) {
      console.error("Error updating supplier:", error);
      throw error;
    }
  }

  // Soft delete supplier (set isDelete = 1)
  static async delete(id) {
    const db = GET_DB();
    try {
      const [result] = await db.query(
        "UPDATE supplier SET isDelete = 1 WHERE id = ?",
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting supplier:", error);
      throw error;
    }
  }
}

export default Supplier;
