import jwt from "jsonwebtoken";
import { GET_DB } from "~/config/mysql";

const checkPermission = (permission) => {
  return async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }

    try {
      const decoded = jwt.verify(token, "your_secret_key");
      req.user = decoded;

      const employeeId = req.user.id;
      const db = await GET_DB();

      const [results] = await db.query(
        `
        SELECT p.name AS permission
        FROM employees e
        JOIN employee_roles er ON e.id = er.employee_id
        JOIN role_permissions rp ON er.role_id = rp.role_id
        JOIN permissions p ON rp.permission_id = p.id
        WHERE e.id = ?
        `,
        [employeeId]
      );

      const permissions = results.map((row) => row.permission);

      if (!permissions.includes(permission)) {
        return res.status(403).send({ message: "Access denied" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).send({ message: "Invalid token" });
    }
  };
};

export { checkPermission };
