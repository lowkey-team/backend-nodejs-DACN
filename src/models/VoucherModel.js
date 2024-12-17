import { GET_DB } from "~/config/mysql";

class Voucher {
  static async getAllVoucherAdmin() {
    const db = GET_DB();
    try {
      const [rows] = await db.query(`CALL GetUnusedVouchersByUser(?);`);

      return rows[0];
    } catch (error) {
      console.error("Error fetching unused vouchers:", error);
      throw error;
    }
  }

  static async getAllVoucherManagementModel() {
    console.log("model voucher");
    const db = GET_DB(); 
    try {
      const rows = await db.query(`SELECT * FROM voucher;`);
      return rows[0];
    } catch (err) {
      throw new Error("Error fetching vouchers: " + err.message);
    }
  }

  static async getAll(id_user) {
    console.log("voucher nugoi dung", id_user);
    const db = GET_DB();
    try {
      const [rows] = await db.query(`CALL GetUnusedVouchersByUser(?);`, [
        id_user && !isNaN(id_user) ? id_user : null,
      ]);

      return rows[0];
    } catch (error) {
      console.error("Error fetching unused vouchers:", error);
      throw error;
    }
  }

  static async GetVouchersSaveByUserID(userId) {
    console.log("voucher nugoi dung", userId);
    const db = GET_DB();
    try {
      const [rows] = await db.query("CALL GetVouchersSaveByUser(?);", [userId]);
      return rows[0];
    } catch (error) {
      console.error("Error fetching saved vouchers:", error);
      throw error;
    }
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
      max_discount_amount,
    } = voucherData;
    
    const db = GET_DB();
  
    try {
      const [existingVoucher] = await db.query("SELECT * FROM Voucher WHERE voucherCode = ?", [voucherCode]);
      if (existingVoucher.length > 0) {
        throw new Error(`Mã voucher: ${voucherCode} đã tồn tại.`);
      }
  
      const [result] = await db.query(
        "INSERT INTO Voucher (voucherCode, description, discountValue, minOrderValue, maxUses, startDate, endDate, isActive, createdAt, updatedAt, max_discount_amount) VALUES (?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW(), ?)",
        [
          voucherCode,
          description,
          discountValue,
          minOrderValue,
          maxUses,
          startDate,
          endDate,
          isActive,
          max_discount_amount,
        ]
      );
  
      return { id: result.insertId, voucherCode };
    } catch (err) {
      console.error("Error while creating voucher:", err);
      throw err;
    }
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
      max_discount_amount,
    } = voucherData;
  
    const db = GET_DB();
  
    try {
      const [existingVoucher] = await db.query(
        "SELECT * FROM Voucher WHERE voucherCode = ? AND id != ?",
        [voucherCode, id]
      );
  
      if (existingVoucher.length > 0) {
        throw new Error(`Mã voucher: ${voucherCode} đã tồn tại.`);
      }
  
      await db.query(
        "UPDATE Voucher SET voucherCode = ?, description = ?, discountValue = ?, minOrderValue = ?, maxUses = ?, startDate = ?, endDate = ?, updatedAt = NOW(), max_discount_amount = ? WHERE id = ?",
        [
          voucherCode,
          description,
          discountValue,
          minOrderValue,
          maxUses,
          startDate,
          endDate,
          max_discount_amount,
          id
        ]
      );
  
      return { id, voucherCode };
    } catch (err) {
      console.error("Error while updating voucher:", err);
      throw err;
    }
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
    const [rows] = await db.query("SELECT * FROM Voucher WHERE id = ?", [
      voucherCode,
    ]);
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
