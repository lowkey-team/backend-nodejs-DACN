import { GET_DB } from "~/config/mysql";

class returnDetail {
  // Lấy tất cả dữ liệu từ bảng return_detail
  static async getAll() {
    const db = GET_DB();
    const [rows] = await db.query(`SELECT * FROM return_detail;`);
    return rows;
  }

  // Tạo mới một bản ghi return_detail
  static async create(returnDetail) {
    const {
      ID_invoiceDetail,
      returnQuantity,
      reason,
      images,
      status = "Đang chờ xử lý", // Giá trị mặc định
      phoneNumber,
    } = returnDetail;

    const db = GET_DB();
    const query = `
      INSERT INTO return_detail 
      (ID_invoiceDetail, returnQuantity, reason, images, status, phoneNumber)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      ID_invoiceDetail,
      returnQuantity,
      reason,
      images,
      status,
      phoneNumber,
    ];

    const [result] = await db.query(query, values);
    return { id: result.insertId, ...returnDetail };
  }

  // Cập nhật một bản ghi return_detail theo ID
  static async update(id, status) {
    console.log("data updtae model:", id, status);
    const db = GET_DB();
    const query = `
    UPDATE return_detail
    SET 
      status = ?
    WHERE id = ?
  `;

    const values = [status, id];

    const [result] = await db.query(query, values);
    return result.affectedRows > 0 ? { id, ...returnDetail } : null;
  }
}

export default returnDetail;
