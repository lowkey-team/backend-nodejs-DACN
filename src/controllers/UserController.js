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
}

export default UserController;
