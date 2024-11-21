import UserService from "~/services/UserServices";

class UserController {
  static async loginUser(req, res) {
    const { identifier, Passwords } = req.body;
    console.log("data controller", identifier, Passwords);
    try {
      const result = await UserService.loginUser(identifier, Passwords);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
  static async createUser(req, res) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      console.error("Error creating user:", err.message);
      res.status(400).json({ message: err.message });
    }
  }

  static async findByID(req, res) {
    try {
      const user = await UserService.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async findByEmail(req, res) {
    try {
      const user = await UserService.findByEmail(req.params.email);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updatePassword(req, res) {
    try {
      const { email, newPassword } = req.body;

      if (!email || !newPassword) {
        return res
          .status(400)
          .json({ message: "Vui lòng nhập đầy đủ thông tin." });
      }

      const result = await UserService.updatePasswordByEmail(
        email,
        newPassword
      );

      return res.status(200).json({
        message: "Cập nhật mật khẩu thành công.",
        data: result,
      });
    } catch (error) {
      console.error("Update Password Error:", error.message);
      return res.status(400).json({ message: error.message });
    }
  }
}

export default UserController;
