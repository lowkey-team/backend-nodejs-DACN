import AuthService from "~/services/AuthService";

class AuthController {
  static async login(req, res) {
    const { phone, password } = req.body;
    try {
      const result = await AuthService.login(phone, password);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async verifyToken(req, res) {
    const { token } = req.body;
    try {
      const decoded = AuthService.verifyToken(token);
      return res.status(200).json({ decoded });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async logout(req, res) {
    try {
      const userId = req.user.id;
      const logoutResponse = await AuthService.logout(userId);
      res.status(200).json(logoutResponse);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default AuthController;
