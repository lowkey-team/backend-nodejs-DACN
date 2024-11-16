import { GET_DB } from "~/config/mysql";

class Voucher {
  static async getAll() {
    const db = GET_DB();
    const [rows] = await db.query(
      `SELECT * FROM Voucher WHERE isActive = 1 AND endDate > NOW()`
    );
    return rows;
  }

  static async create(voucherData) {
    const {
      voucherCode,
      description,
      discountValue,
      minOrderValue,
      maxUses,
      startDate,
      endDate,
      isActive,
    } = voucherData;
    const db = GET_DB();
    const [result] = await db.query(
      "INSERT INTO Voucher (voucherCode, description, discountValue, minOrderValue, maxUses, startDate, endDate, isActive, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [
        voucherCode,
        description,
        discountValue,
        minOrderValue,
        maxUses,
        startDate,
        endDate,
        isActive,
      ]
    );
    return { id: result.insertId, voucherCode };
  }

  static async update(id, voucherData) {
    const {
      voucherCode,
      description,
      discountValue,
      minOrderValue,
      maxUses,
      startDate,
      endDate,
      isActive,
    } = voucherData;
    const db = GET_DB();
    await db.query(
      "UPDATE Voucher SET voucherCode = ?, description = ?, discountValue = ?, minOrderValue = ?, maxUses = ?, startDate = ?, endDate = ?, isActive = ?, updatedAt = NOW() WHERE id = ?",
      [
        voucherCode,
        description,
        discountValue,
        minOrderValue,
        maxUses,
        startDate,
        endDate,
        isActive,
        id,
      ]
    );
    return { id, voucherCode };
  }

  static async delete(id) {
    const db = GET_DB();
    const [result] = await db.query(
      "UPDATE Voucher SET isActive = 0 WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0;
  }

  static async findById(id) {
    const db = GET_DB();
    const [rows] = await db.query("SELECT * FROM Voucher WHERE id = ?", [id]);
    return rows[0] || null;
  }

  static async findByCode(voucherCode) {
    const db = GET_DB();
    const [rows] = await db.query(
      "SELECT * FROM Voucher WHERE voucherCode = ?",
      [voucherCode]
    );
    return rows[0] || null;
  }

  static async addVoucherToUser(ID_User, ID_Voucher) {
    try {
      console.log("addVoucher model:", ID_User, ID_Voucher);
      const db = GET_DB();

      const [result] = await db.query(
        "INSERT INTO voucher_user (ID_User, ID_Voucher) VALUES (?, ?)",
        [ID_User, ID_Voucher]
      );

      console.log("Insert result:", result);
      return { ID_User, ID_Voucher };
    } catch (error) {
      console.error("Error occurred while adding voucher to user:", error);
      throw new Error("Unable to add voucher to user");
    }
  }

  static async findVoucherByUserAndVoucher(ID_User, ID_Voucher) {
    try {
      const db = GET_DB();
      const [rows] = await db.query(
        "SELECT * FROM voucher_user WHERE ID_User = ? AND ID_Voucher = ?",
        [ID_User, ID_Voucher]
      );

      if (rows.length === 0) {
        console.log("No matching record found");
        return null;
      }

      console.log("Found record:", rows);
      return rows[0];
    } catch (error) {
      console.error("Error occurred while searching for voucher:", error);
      throw new Error("Unable to find voucher");
    }
  }
}

export default Voucher;
