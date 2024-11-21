import jwt from "jsonwebtoken";
import { GET_DB } from "~/config/mysql";
import bcrypt from "bcrypt";

const SECRET_KEY = "your_secret_key";

class User {
  static async findByPhone(Phone) {
    const db = GET_DB();
    const [rows] = await db.query(
      "SELECT * FROM Users WHERE Phone = ? AND isDelete = 0",
      [Phone]
    );
    console.log("log phone model: " + Phone);
    return rows[0];
  }
  static async findByEmail(Email) {
    const db = GET_DB();
    const [rows] = await db.query(
      "SELECT * FROM Users WHERE Email = ? AND isDelete = 0",
      [Email]
    );
    console.log("log email model: " + Email);
    return rows[0];
  }
  static async findByEmail(Email) {
    const db = GET_DB();
    const [rows] = await db.query(
      "SELECT * FROM Users WHERE Email = ? AND isDelete = 0",
      [Email]
    );
    return rows.length > 0;
  }

  static async create(userData) {
    const db = GET_DB();
    const { FullName, Phone, Passwords, address, Email } = userData;
    const hashedPassword = await bcrypt.hash(Passwords, 10);

    const [result] = await db.query(
      "INSERT INTO Users (FullName, Phone, Passwords, address, Email, isDelete, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, 0, NOW(), NOW())",
      [FullName, Phone, hashedPassword, address, Email]
    );

    return { id: result.insertId, FullName, Phone, Email };
  }
  static async login(phone, password) {
    console.log("data login", phone, password);
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

    console.log("token :", token);
    return {
      token,
      user: { id: user.id, FullName: user.FullName, Phone: user.Phone },
    };
  }

  static async findById(id) {
    const db = GET_DB();
    const [rows] = await db.query("SELECT * FROM Users WHERE id =?", [id]);
    return rows[0];
  }

  static async updatePasswordByEmail(Email, newPassword) {
    const db = GET_DB();
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [result] = await db.query(
      "UPDATE Users SET Passwords = ?, updatedAt = NOW() WHERE Email = ? AND isDelete = 0",
      [hashedPassword, Email]
    );

    if (result.affectedRows > 0) {
      return { success: true, message: "Password updated successfully" };
    } else {
      return { success: false, message: "User not found or email invalid" };
    }
  }
}

export default User;
