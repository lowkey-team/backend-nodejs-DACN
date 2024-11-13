import Auth from "~/models/AuthModel";
import bcrypt from "bcrypt";

class AuthService {
  static async login(phone, password) {
    try {
      // Gọi Auth.login để xử lý đăng nhập, không cần mã hóa lại mật khẩu ở đây
      const result = await Auth.login(phone, password);

      // Nếu đăng nhập thành công, trả về token và thông tin người dùng
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static verifyToken(token) {
    try {
      return Auth.verifyToken(token);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async logout(userId) {
    const result = await Auth.logout(userId);
    if (!result) {
      throw new Error("Không tìm thấy token để xóa.");
    }
    return { message: "Đăng xuất thành công" };
  }
}

export default AuthService;
