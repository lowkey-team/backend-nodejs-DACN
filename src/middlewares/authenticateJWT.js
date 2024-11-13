import jwt from "jsonwebtoken";
import { SECRET_KEY } from "~/config";

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Lấy token từ header Authorization

  if (!token) {
    return res.status(403).json({ error: "Không tìm thấy token" });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Token không hợp lệ" });
    }
    req.user = user; // Lưu thông tin người dùng vào request
    next();
  });
};

export default authenticateJWT;
