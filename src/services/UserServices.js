import User from "~/models/UserModel";
import bcrypt from "bcrypt";
import { env } from "~/config/environment";
import jwt from "jsonwebtoken";

const SECRET_KEY = env.SECRET_KEY;
class UserService {
  static async loginUser(identifier, password) {
    console.log("User services", +identifier);
    console.log("Password", +password);
    let user;
    if (identifier.includes("@")) {
      user = await User.findByEmail(identifier);
    } else {
      user = await User.findByPhone(identifier);
    }

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
      user: {
        id: user.id,
        FullName: user.FullName,
        Phone: user.Phone,
        Email: user.Email,
      },
    };
  }
  static async createUser(userData) {
    const existingPhone = await User.findByPhone(userData.Phone);
    if (existingPhone) {
      throw new Error("Số điện thoại này đã được sử dụng");
    }

    const existingEmail = await User.findByEmail(userData.Email);
    if (existingEmail) {
      throw new Error("Email này đã được sử dụng");
    }

    return await User.create(userData);
  }

  static async findById(id) {
    return await User.findById(id);
  }
}

export default UserService;
