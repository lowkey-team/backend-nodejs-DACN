import jwt from "jsonwebtoken";
import { GET_DB } from "~/config/mysql";
import bcrypt from "bcrypt";

const SECRET_KEY = "your_secret_key";
const expiresAt = new Date(Date.now() + 3600000);
class Auth {
  static async login(phone, password) {
    const db = GET_DB();

    const [rows] = await db.query(
      "SELECT * FROM Users WHERE Phone = ? AND isDelete = 0",
      [phone]
    );
    const user = rows[0];

    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    const passwordMatch = await bcrypt.compare(password, user.Passwords);
    if (!passwordMatch) {
      throw new Error("Mật khẩu không đúng");
    }

    const token = jwt.sign({ id: user.id, phone: user.Phone }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return {
      token,
      user: { id: user.id, FullName: user.FullName, Phone: user.Phone },
    };
  }
  static verifyToken(token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
    } catch (error) {
      throw new Error("Token không hợp lệ hoặc đã hết hạn");
    }
  }

  static async logout(userId) {
    const db = GET_DB();
    const result = await db.query("DELETE FROM token_user WHERE user_id = ?", [
      userId,
    ]);

    if (result.affectedRows === 0) {
      throw new Error("Không tìm thấy token để xóa.");
    }

    return { message: "Đăng xuất thành công" };
  }
}

export default Auth;
